// imports
import express from "express";
import { Liquid } from "liquidjs";
import dotenv from "dotenv";
import fetch from "node-fetch";

// express
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// dotenv
dotenv.config();

// liquid en views
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

// herbruikbare fetch-functie
async function fetchJSON(url) {
  const token = process.env.TOKEN;

  const response = await fetch(url, {
    headers: {
      "Authorization": `Bearer ${token}`,
      "Accept": "application/json"
    }
  });

  if (!response.ok) {
    throw new Error(`Fetch error for ${url}: ${response.status}`);
  }

  return response.json();
}

// directus endpoints
const learningstoneEndpoint = "https://fdnd-agency.directus.app/items/learningstone";
const factsEndpoint = "_facts";
const answersEndpoint = "_answers";

// routes
app.get("/", async function (request, response) {
  response.render("index.liquid");
});

app.get("/profile", async function (request, response) {
  response.render("profile.liquid");
});

app.get("/game-start", async function (request, response) {
  response.render("game-start.liquid");
});

app.get("/game", async function (request, response) {
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;

  try {
    // haal facts op 
    const factsResponse = await fetch(`${learningstoneEndpoint}${factsEndpoint}`);
    const factsResponseJSON = await factsResponse.json();

    // 1. haal lijst van member IDs
    const membersData = await fetchJSON(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`);
    const memberIds = membersData.result;

    // 2. haal details per member
    const memberDetails = await Promise.all(
      memberIds.map(async function (id) {
        const data = await fetchJSON(`${baseUrl}/model/rsc_export/get/${id}`);

        return {
          id,
          name: data.result?.resource?.title || "Onbekend",
          image: data.result?.depiction_url || "/default.jpg"
        };
      })
    );

    // 3. render template
    response.render("game.liquid", { 
      members: memberDetails,
      funfacts: factsResponseJSON.data 
    });

  } catch (error) {
    console.error("Fout bij ophalen:", error);
    response.status(500).send("Er ging iets mis bij het ophalen van de leden");
  }
});

app.post("/game", async function (request, response) {
  console.log("Received form submission. request.body:", request.body); 
  try {
    const answers = [];
    const formData = request.body; 

    for (const key in formData) {
      if (key.startsWith("funfact-")) {
        const memberId = key.replace("funfact-", ""); 
        const selectedFact = formData[key]; 

        
        if (selectedFact && selectedFact !== "start" && selectedFact !== "") {
          answers.push({
            user_id: parseInt(memberId), 
            fact: parseInt(selectedFact), 
            for: "sprint 12 Julia", 
          });
        }
      }
    }
    // Post each answer to your Directus database
    const directusEndpoint = `${learningstoneEndpoint}${answersEndpoint}`;

    const postPromises = answers.map(async (answer) => {
      const directusResponse = await fetch(directusEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(answer),
      });

      if (!directusResponse.ok) {
        const errorData = await directusResponse.json();
        console.error(`Failed to post answer for user_id ${answer.user_id}:`, errorData);
        throw new Error(`Failed to post answer for user_id ${answer.user_id}`); 
      }
      return directusResponse.json();
    });

    await Promise.all(postPromises); 

    response.redirect("/game?status=success"); 
  } catch (error) {
    console.error("Error submitting answers:", error);
    response.status(500).send("Er ging iets mis bij het opslaan van de antwoorden.");
  }
});

// proxy voor de images
app.get("/proxy-image", async function (request, response) {
  // URL vanuit browsers
  const imageUrl = request.query.url;
  const token = process.env.TOKEN;

  // check URL 
  if (!imageUrl || !imageUrl.startsWith("https://ls-test2.worrell.nl/")) {
    return response.status(403).send("Forbidden or missing image URL");
  }

  // image ophalen 
  try {
    const imageResponse = await fetch(imageUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!imageResponse.ok) {
      return response.status(imageResponse.status).send("Image not accessible");
    }

    // image doorsturen naar brosers
    response.set("Content-Type", imageResponse.headers.get("Content-Type"));
    imageResponse.body.pipe(response);

  } catch (err) {
    console.error("Image proxy error:", err);
    response.status(500).send("Error proxying image");
  }
});

// port
app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
