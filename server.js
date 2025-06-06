import express from "express";
import { Liquid } from "liquidjs";
import dotenv from "dotenv";
import fetch from "node-fetch";

const app = express();
dotenv.config();

app.use(express.static("public"));

const engine = new Liquid();
app.engine("liquid", engine.express());
app.set("views", "./views");

app.get("/", async function (request, response) {
      response.render("index.liquid");
});

app.get("/game-start", async function (request, response) {
  response.render("game-start.liquid");
});

app.get("/game", async function (request, response) {
  const token = process.env.TOKEN;
  const baseUrl = process.env.BASE_URL;
  const groupId = process.env.GROUP_ID;

  try {
    // 1. Haal lijst van member IDs
    const membersResponse = await fetch(`${baseUrl}/model/maxclass_membership/get/class/${groupId}/member`, {
      headers: {
        "Authorization": `Bearer ${token}`,
        "Accept": "application/json"
      }
    });

    if (!membersResponse.ok) throw new Error(`Members fetch error: ${membersResponse.status}`);
    const membersData = await membersResponse.json();
    const memberIds = membersData.result;

    const memberDetails = await Promise.all(
      memberIds.map(async (id) => {
        const response = await fetch(`${baseUrl}/model/rsc_export/get/${id}`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Accept": "application/json"
          }
        });
    
        if (!response.ok) throw new Error(`Detail fetch error for ${id}: ${response.status}`);
        const data = await response.json();

        return {
          id,
          name: data.result?.resource?.title || "Onbekend",
          image: data.result?.depiction_url || "/default.jpg"
        };
      })
    );

    console.log(memberDetails)

    // 3. Render template
    response.render("game.liquid", { members: memberDetails });

  } catch (error) {
    console.error("Fout bij ophalen:", error);
    response.status(500).send("Er ging iets mis bij het ophalen van de leden");
  }
});

app.get("/proxy-image", async function (request, response) {
  const imageUrl = request.query.url;
  const token = process.env.TOKEN;

  if (!imageUrl || !imageUrl.startsWith("https://ls-test2.worrell.nl/")) {
    return response.status(403).send("Forbidden or missing image URL");
  }

  try {
    const imageResponse = await fetch(imageUrl, {
      headers: {
        "Authorization": `Bearer ${token}`
      }
    });

    if (!imageResponse.ok) {
      return response.status(imageResponse.status).send("Image not accessible");
    }

    response.set("Content-Type", imageResponse.headers.get("Content-Type"));

    imageResponse.body.pipe(response);
  } catch (err) {
    console.error("Image proxy error:", err);
    response.status(500).send("Error proxying image");
  }
});

app.set("port", process.env.PORT || 8000);

app.listen(app.get("port"), function () {
  console.log(`Application started on http://localhost:${app.get("port")}`);
});