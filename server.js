// imports
import express from "express";
import { Liquid } from "liquidjs";
import dotenv from "dotenv";
import fetch from "node-fetch";

// express
const app = express();
app.use(express.static("public"));

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

// routes
app.get("/", async function (request, response) {
  response.render("index.liquid");
});

app.get("/game-start", async function (request, response) {
  response.render("game-start.liquid");
});

app.get("/game", async function (request, response) {
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;

  try {
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
    response.render("game.liquid", { members: memberDetails });

  } catch (error) {
    console.error("Fout bij ophalen:", error);
    response.status(500).send("Er ging iets mis bij het ophalen van de leden");
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
