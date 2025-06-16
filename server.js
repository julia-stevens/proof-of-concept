// ========== MARK: imports ==========
import express from "express";
import { Liquid } from "liquidjs";
import dotenv from "dotenv";
import fetch from "node-fetch";

// ========== MARK: express ==========
const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

// ========== MARK: dotvenv ==========
dotenv.config();

// ========== MARK: liquid ==========
const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

// ========== MARK: directus endpoints ==========
const learningstoneEndpoint = "https://fdnd-agency.directus.app/items/learningstone";
const factsEndpoint = "_facts"; 
const answersEndpoint = "_answers";

// ========== MARK: routes ==========

// index
app.get("/", (request, response) => {
  response.render("index.liquid");
});

// profile
app.get("/profile", (request, response) => {
  response.render("profile.liquid");
});

// game start
app.get("/game/start", (request, response) => {
  response.render("game-start.liquid");
});

// game play GET
app.get("/game/play", async (request, response) => {
  // haal lijst met members en funfacts op 
  const [members, facts] = await Promise.all([ // start beide async functies & wacht tot ze allebei klaar zijn 
    fetchMembers(), // haal leden op 
    fetchFacts() // haal funfacts op 
  ]);

  response.render("game.liquid", { 
    members,
    funfacts: facts 
  });
});

// game play POST
app.post("/game/play", async (request, response) => {
  // verwerk ge-POST-te antwoorden en sla ze op in database
  await submitAnswers(request.body);

  response.redirect("/game/results");
});

// game results
app.get("/game/results", async (request, response) => {
  // haal data op: leden, POST data, counters, correcte antwoorden, etc
  const gameData = await getGameData();

  response.render("game-results.liquid", gameData);
});

// prikbord
app.get("/notice-board", async (request, response) => {
  // haal data op: leden, POST data, counters, correcte antwoorden, etc
    const gameData = await getGameData();

  response.render("notice-board.liquid", gameData);
});

// admin
app.get("/admin", (request, response) => {
  response.render("admin.liquid");
});

// admin POST
app.post("/admin", async (request, response) => {
  // fetch alle antwoorden met for filter (sprint LearningStone)
  const getAnswers = await fetch(
    `${learningstoneEndpoint}${answersEndpoint}?filter[for][_starts_with]=sprint%20LearningStone&limit=-1`
  );
  
  try {
    // parse JSON data
    const getAnswersJSON = await getAnswers.json();

    // als er data is
    if (getAnswersJSON.data && getAnswersJSON.data.length > 0) {

      // wacht tot alle promises klaar zijn (alle answers zijn ge-delete)
      await Promise.all(getAnswersJSON.data.map(answer =>
        // voor elk answer in database een fetch (returnt promise)
        fetch(`https://fdnd-agency.directus.app/items/learningstone_answers/${answer.id}`, {
          // delete
          method: "DELETE",
        })
      ));
    }
  } catch (error) {
    // als parsen niet lukt
    console.error(error);
  }

  response.redirect(303, "/");
});

// image proxy (met Chad)
app.get("/proxy-image", async (request, response) => {
  // haal URL op 
  const imageUrl = request.query.url;
  const token = process.env.TOKEN;

  // alleen images met URL die bij dit project hoort
  if (!imageUrl || !imageUrl.startsWith("https://ls-test2.worrell.nl/")) {
    return response.status(403).send("Forbidden or missing image URL");
  }

  // met fetch haal afbeeldingen op, met authorisation header
  const imageResponse = await fetch(imageUrl, {
    headers: { "Authorization": `Bearer ${token}` }
  });

  // als ophalen niet lukt, stuur error
  if (!imageResponse.ok) {
    return response.status(imageResponse.status).send("Image not accessible");
  }

  // zodat browser weet dat het een afbeelding is
  response.set("Content-Type", imageResponse.headers.get("Content-Type"));

  // stuur afbeelding naar client
  imageResponse.body.pipe(response);
});

// ========== 404 ==========
app.use((request, response) => {
  response.status(404).render("error.liquid");
});

// ========== 404 ==========
app.use((req, res) => {
  res.status(404).render("error.liquid");
});

// ========== MARK: functies ==========

// haal JSON op van API
async function fetchJSON(url) {
  const token = process.env.TOKEN;

  // GET request naar URL
  const response = await fetch(url, {
    headers: {
      // token voor toegang
      "Authorization": `Bearer ${token}`,

      // vraag JSON data aan server
      "Accept": "application/json"
    }
  });
  
  try {
    // parse data als JSON
    return await response.json();
  } catch (error) {
    // anders foutmelding
    console.error(error);
  }
}

// haal leden met naam en image op  
async function fetchMembers() { //
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;
  
  // lijst met memberID's ophalen uit groep (id in .env)
  const membersData = await fetchJSON(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`);
  const memberIds = membersData.result;

  // bij elke ID haal naam en afbeelding op
  return Promise.all( // Promise wacht op meerdere promises (await in dit geval)
    memberIds.map(async (id) => {
      // haal voor elke member de info op
      const data = await fetchJSON(`${baseUrl}/model/rsc_export/get/${id}`);
      return { 
        // object met id, name, image (gevuld met de opgevraagde data)
        id,
        name: data.result?.resource?.title,
        image: data.result?.depiction_url
      };
    })
  );
}

// haal funfacts op uit Directus
async function fetchFacts() {
  // haal funfacts op uit Directus database
  const response = await fetch(`${learningstoneEndpoint}${factsEndpoint}`);
  
  try {
    // parse JSON
    const responseJSON = await response.json();

    // return data array
    return responseJSON.data;
  } catch (error) {
    // log error als parsen niet lukt
    console.error(error);
  }
}

// haal ge-POST-te info op uit Directus
async function fetchSubmissions() {
  // haal answers op uit Directus database
  const response = await fetch(`${learningstoneEndpoint}${answersEndpoint}`);
  
  try {
    // parse JSON
    const responseJSON = await response.json();

    // return array uit data object
    // filter, dus nieuw array terug, voor elke POST check of for veld "sprint LearningStone" is, dan voeg toe aan deze array
    return responseJSON.data.filter(submission => submission.for === "sprint LearningStone");
  } catch (error) {
    // log error als parsen niet lukt
    console.error(error);
  }
}

// zet funfacts om in maps 
function createFactMaps(facts) {
  // Map() maakt koppeling tussen member id en funfact id
  const correctFactIdMap = new Map();

  // Map() maakt koppeling tussen funfact id en funfact tekst
  const factTextMap = new Map();
  
  // voor elke funfact
  facts.forEach(fact => {
    // koppel gebruiker aan juiste funfact
    correctFactIdMap.set(fact.user_id, fact.id);

    // koppel funfact aan juiste tekst (met funfact)
    factTextMap.set(fact.id, fact.fact);
  });
  
  // return maps
  return { correctFactIdMap, factTextMap };
}

// haal laatste datum/tijd op waarop ge-POST is
function getLatestGameDate(submissions) {
  // als niks ge-POST, return null
  if (submissions.length === 0) return null;
  
  // met reduce langs alle submissions, en nieuwste datum vasthouden 
  return submissions.reduce((maxDate, submission) => {
    // maak date object aan (haal info op uit database (date_created))
    const currentDate = new Date(submission.date_created);

    // zoek nieuwste datum 
    // als currectData nieuwer dan maxData (hoogste datum tot nu toe), dan return currectData, anders maxDate
    return currentDate > maxDate ? currentDate : maxDate;
  }, new Date(0));
}

// filter alleen POST data uit meest recente POST
function getCurrentRoundSubmissions(submissions, latestGameDate) {
  // als geen laatste datum, dan leeg
  if (!latestGameDate) return [];
  
  // return nieuwe array, en voor elke submission:
  return submissions.filter(submission => {
    // date object met datum (info uit database (date_created))
    const submissionDate = new Date(submission.date_created);

    // 1s verschil is nog dezelfde ronde
    return Math.abs(submissionDate.getTime() - latestGameDate.getTime()) <= 1000;
  });
}

// vergelijkt antwoorden met juiste feiten 
function calculateGameResults(members, currentRoundSubmissions, correctFactIdMap, factTextMap) {
  let correctCount = 0;
  let incorrectCount = 0;
  let unansweredCount = 0;
  const matchResults = [];

  // voor elke member
  members.forEach(member => {
    const userGuess = currentRoundSubmissions.find(
      // check het antwoord dat gegeven is
      submission => submission.user_id === member.id
    );

    // haal correcte funfact id op
    const correctFactId = correctFactIdMap.get(member.id);

    // haal correcte funfact tekst op 
    const correctFactText = factTextMap.get(correctFactId);

    let isCorrect = false;
    let submittedFactId = null;
    let submittedFactText = "Niet ingevuld";

    // als er een POST was
    if (userGuess) {
      // funfact id die gegeven is
      submittedFactId = userGuess.fact;

      // funfact tekst die gegeven is (haal uit map)
      submittedFactText = factTextMap.get(submittedFactId);

      // als funfact is ge-POST & is correct
      if (submittedFactId !== null && submittedFactId === correctFactId) {
        correctCount++; // tel op bij correctCount counter
        isCorrect = true; // zet isCorrect naar true
      } else if (submittedFactId === null) { // als geen funfact ge-POST is
        unansweredCount++; // tel op bij unansweredCount counter
      } else {
        incorrectCount++; // anders tel op bij incorrectCount counter
      }
    } else { // als geen funfact ge-POST, dan tel op bij unansweredCount counter
      unansweredCount++;
    }

    // vul matchResults array
    matchResults.push({
      member: { id: member.id, name: member.name, image: member.image }, // member info
      submittedFactId, // ge-POST-te funfact id
      submittedFactText, // ge-POST-te funfact tekst
      correctFactId, // correcte id
      correctFactText, // correcte tekst
      isCorrect, // counter
      wasGuessed: !!userGuess // true/false of er een POST was (of value is geselecteerd)
    });
  });

  // return counters & array met info 
  return { correctCount, incorrectCount, unansweredCount, matchResults };
}

// alle data ophalen en resultaten berekenen 
async function getGameData() {
  const [members, facts, submissions] = await Promise.all([
    fetchMembers(), // haal groepsleden op
    fetchFacts(), // haal funfacts op 
    fetchSubmissions() // haal ge-POST-te data op
  ]);

  // maps met correcte funfact id's en tekst (value's)
  const { correctFactIdMap, factTextMap } = createFactMaps(facts);

  // bepaal de laatst gespeelde ronde
  const latestGameDate = getLatestGameDate(submissions);

  // bepaal data die bij laatst gespeelde ronde hoort
  const currentRoundSubmissions = getCurrentRoundSubmissions(submissions, latestGameDate);

  // bereken resultaten 
  const gameResults = calculateGameResults(members, currentRoundSubmissions, correctFactIdMap, factTextMap);

  return {
    members,
    funfacts: facts,

    // als er een ronde gespeeld is, dan zet om naar datum/tijd string, anders null
    latestGameTimestamp: latestGameDate ? latestGameDate.toISOString() : null,

    // en voeg alle game results toe aan latestGameTimestamp object (counters & matchResults array)
    ...gameResults
  };
}

// info uit formulier POST-en naar API
async function submitAnswers(formData) {
  // haal alle members op 
  const members = await fetchMembers();
  const answers = []; // answers array

  // for, want await is hierin te gebruiken 
  for (const member of members) {
    // haal geselecteerde funfact op uit formulier
    const selectedFact = formData[`funfact-${member.id}`];

    // definieer variabele
    // als funfact geselecteerd is, en niet start, en niet niks
    const factValue = (selectedFact && selectedFact !== "start" && selectedFact !== "")
      ? parseInt(selectedFact) // dan parse naar nummer
      : null; // anders null

    answers.push({ // voeg data toe aan answers array
      user_id: parseInt(member.id), // id van member
      fact: factValue, // gekozen fact id (of null)
      for: "sprint LearningStone", // filter (om alleen mijn POST-s te krijgen)
    });
  }

  const directusEndpoint = `${learningstoneEndpoint}${answersEndpoint}`;

  // voor elke POST in answers
  const postPromises = answers.map(async (answer) => {
    const response = await fetch(directusEndpoint, {
      // POST method
      method: "POST",

      // geef aan dat gestuurde data JSON is
      headers: { "Content-Type": "application/json" },

      // stuur antwoord in de body
      body: JSON.stringify(answer),
    });

    try {
      // parse response
      return await response.json();
    } catch (error) {
      // log error als parsen niet lukt
      console.error(error);
    }
  });

  // wacht tot alle POST request klaar zijn 
  await Promise.all(postPromises);
}

// ========== MARK: port  ==========
app.set("port", process.env.PORT || 8000);
app.listen(app.get("port"), () => {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});