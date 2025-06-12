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

app.get("/game/start", async function (request, response) {
  response.render("game-start.liquid");
});

app.get("/game/play", async function (request, response) {
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;

  try {
    // haal facts op
    const factsResponse = await fetch(`${learningstoneEndpoint}${factsEndpoint}`);
    const factsResponseJSON = await factsResponse.json();

    // haal lijst van member IDs op
    const membersData = await fetchJSON(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`);
    const memberIds = membersData.result;

    // haal details per member op
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

app.post("/game/play", async function (request, response) {
  console.log("Received form submission. request.body:", request.body); 
  try {
    const answers = [];
    const formData = request.body; 
    const baseUrl = process.env.BASE_URL; 
    const groupId = process.env.GROUP_ID; 

    const membersData = await fetchJSON(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`);
    const memberIds = membersData.result;

    for (const memberId of memberIds) {
      const selectedFact = formData[`funfact-${memberId}`]; // Haal de waarde op voor dit specifieke lid-ID

      const factValue = (selectedFact && selectedFact !== "start" && selectedFact !== "")
        ? parseInt(selectedFact)
        : null;

      answers.push({
        user_id: parseInt(memberId), 
        fact: factValue,
        for: "sprint LearningStone", 
      });
    }

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

    response.redirect("/game/results"); 
  } catch (error) {
    console.error("Error submitting answers:", error);
    response.status(500).send("Er ging iets mis bij het opslaan van de antwoorden.");
  }
});

app.get("/game/results", async function (request, response) {
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;
  const groupName = "sprint 12 Julia"; 

  try {
    const membersData = await fetchJSON(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`);
    const memberIds = membersData.result;
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
    const memberMap = new Map(memberDetails.map(member => [member.id, member]));

    const factsResponse = await fetch(`${learningstoneEndpoint}${factsEndpoint}`);
    const funfactsData = (await factsResponse.json()).data;

    const correctFactIdMap = new Map(); 
    const factTextMap = new Map(); 
    funfactsData.forEach(fact => {
      correctFactIdMap.set(fact.user_id, fact.id);
      factTextMap.set(fact.id, fact.fact); 
    });

    const allUserSubmissionsResponse = await fetch(`${learningstoneEndpoint}${answersEndpoint}`);
    const allUserSubmissionsData = (await allUserSubmissionsResponse.json()).data;

    const groupSubmissions = allUserSubmissionsData.filter(
      submission => submission.for === groupName
    );

    let latestGameDate = null;
    if (groupSubmissions.length > 0) {
      latestGameDate = groupSubmissions.reduce((maxDate, submission) => {
        const currentDate = new Date(submission.date_created);
        return currentDate > maxDate ? currentDate : maxDate;
      }, new Date(0));
    }

    const timeWindowMs = 1000; 

    const currentRoundSubmissions = latestGameDate
      ? groupSubmissions.filter(submission => {
          const submissionDate = new Date(submission.date_created);
          return Math.abs(submissionDate.getTime() - latestGameDate.getTime()) <= timeWindowMs;
        })
      : [];

    let correctCount = 0;
    let incorrectCount = 0;
    let unansweredCount = 0;

    const matchResults = [];

    memberDetails.forEach(member => {
      const userGuess = currentRoundSubmissions.find(
        submission => submission.user_id === member.id
      );

      const correctFactId = correctFactIdMap.get(member.id);
      const correctFactText = factTextMap.get(correctFactId);

      let isCorrect = false;
      let submittedFactId = null;
      let submittedFactText = "Niet ingevuld"; 

      if (userGuess) {
        submittedFactId = userGuess.fact; 
        submittedFactText = factTextMap.get(submittedFactId) || "Onbekende feit"; 

        if (submittedFactId !== null && submittedFactId === correctFactId) {
          correctCount++;
          isCorrect = true;
        } else if (submittedFactId === null) {
          unansweredCount++;
          isCorrect = false; 
        } else {
          incorrectCount++;
          isCorrect = false;
        }
      } else {
        unansweredCount++;
      }

      matchResults.push({
        member: { id: member.id, name: member.name, image: member.image },
        submittedFactId: submittedFactId,
        submittedFactText: submittedFactText,
        correctFactId: correctFactId,
        correctFactText: correctFactText,
        isCorrect: isCorrect,
        wasGuessed: !!userGuess 
      });
    });


    response.render("game-results.liquid", { 
      members: memberDetails, 
      funfacts: funfactsData, 
      correctCount: correctCount,
      incorrectCount: incorrectCount,
      unansweredCount: unansweredCount,
      matchResults: matchResults, 
      latestGameTimestamp: latestGameDate ? latestGameDate.toISOString() : null 
    });

  } catch (error) {
    console.error("Fout bij ophalen van resultaten:", error);
    response.status(500).send("Er ging iets mis bij het ophalen van de resultaten.");
  }
});

// proxy voor de images (van ChatGPT)
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

// admin
app.get("/admin", async function (request, response){
  response.render("admin.liquid")
})

app.post("/admin", async function (request, response) {
});


// port
app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});

// 404 pagina
app.use((request, response, next) => {
  response.status(404).render("error.liquid")
})