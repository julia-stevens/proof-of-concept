De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# LearningStone - Functie om elkaar beter te leren kennen 
Ontwerp en maak een data driven online concept voor een opdrachtgever

[Live site](https://proof-of-concept-bbmm.onrender.com/)

<img width="200" alt="image" src="https://github.com/user-attachments/assets/6d919198-8699-4bf6-ac06-b61b0b896da5" />
<img width="400" alt="image" src="https://github.com/user-attachments/assets/cc241d79-6ec7-46ff-af6a-dc0f6c57e2a0" />

## Inleiding 
### Over _LearningStone_
LearningStone is een veilige (online) omgeving voor leren en samenwerken om training en coaching te ondersteunen. 

### Uitdaging
Deelnemers worden door elkaar gemotiveerd. Trainingen zijn vaak kort en vaker een vorm van blended trainen. Dit betekent dat er minder fysieke bijeenkomsten zijn, maar een behoefte aan groepsgevoel blijft. Sneller elkaar leren kennen helpt bij groepscohesie. Activiteiten in gemeenschappelijke online omgeving draagt bij aan motivatie van deelnemers. 

Daarom: maak een speelse functie, zodat leden in een groep elkaar sneller beter leren kennen. 

### Oplossing
Bij het aanmaken van een profiel, wordt de gebruiker gevraagd om een funfact over zichzelf te delen. Voor aanvang van een cursus, volgt de functie "Match de feitjes". Gebruikers moeten hierin de ingestuurde funfacts koppelen aan het juiste groepslid. Na het invullen krijgt de gebruiker de resultaten te zien, inclusief juiste antwoorden en wordt het resultaat naar het prikbord gepost (bestaande functie in LearningStone). 

[Live site](https://proof-of-concept-bbmm.onrender.com/)

## Inhoudsopgave
- [Beschrijving](#beschrijving)
- [Kenmerken](#kenmerken)
- [Installatie](#installatie)
- [Bronnen](#bronnen)
- [Licentie](#licentie)

## Beschrijving
"Match de feitjes" omvat een functionaliteit die aan cursussen als module kan worden toegevoegd. Leden van de groepen leren elkaar kennen door opgegeven funfacts aan elkaar te koppelen. Resultaten worden naar het algemene prikbord gepost, zodat hier ook gesproken kan worden. 

### `Profile`
Op de `/profile` maakt de gebruiker een profiel aan: vult naam en profiel foto in én hierbij ook een funfact. 
- Bij de input velden krijgt de gebruiker direct feedback of de ingevoerde waarde correct is. Groen wanneer dit juist is, rood wanneer dit niet juist is. 

https://github.com/user-attachments/assets/a1c13efd-914b-4aea-a7cf-214ce90c290e

### `/game/play`
Op de `/game/start` pagina volgt een korte uitleg over het spel, en dan gaat de speler door naar de `/game/play` pagina. Op de `/game/play` pagina wordt het spel, "Match de feitjes", gespeeld. Per lid kan er een funfact gekoppeld worden. 

#### Belangrijke features
##### Staggered animatie
- De animatie-duur past zich aan o.b.v. hoe vaak de gebruiker een menu heeft geopend. Hoe vaker, hoe sneller de animatie en uiteindelijk stop dit. 

https://github.com/user-attachments/assets/3513d854-a452-425e-b375-0eb6b2e89966

##### View transition
- Bij het kiezen van een funfact, verschijnt deze met een view transition. 

https://github.com/user-attachments/assets/4fb0e10c-a836-46a7-8062-f40544009c4c

### `/game/results`
Nadat alle funfacts zijn verdeeld en de data wordt verstuurd, krijgt de gebruiker op een nieuwe pagina een overzicht van de resultaten. Hierop zijn alle juiste, onjuiste en ingegeven antwoorden terug te zien. 

https://github.com/user-attachments/assets/4bc90efb-d363-440d-a874-469fa4b80060

### `/notice-board`
Wanneer de gebruiker klaar is met het bekijken van de resultaten, dan de module afgesloten worden en worden de resultaten autmatisch op het prikbord gepost. Dit om te zorgen dat de leden in contact komen met elkaar, en elkaars resultaten kunnen bekijken. 

https://github.com/user-attachments/assets/dc814145-212b-49fc-8f9b-47d4429f8be0

- Op het prikbord komt dan ook een grafiek te staan, waarop de resultaten terug te zien zijn. Alle juiste en onjuist beantwoordden leden zijn hier terug te zien. Dit is nog een functionaliteit voor de toekomst. 

<img width="350" alt="image" src="https://github.com/user-attachments/assets/c9020177-8dbd-43cc-8d68-3ca922527513" />

### Ontwerpkeuzes
Ik heb zoveel mogelijk de huisstuil van het platform LearningStone aangehouden, dit is bijvoorbeeld terug te zien in: 
- Vormgeving van de cards met een ronde border en schaduw.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/df68b569-ceb7-43af-a75c-854416e76cde" />

- Kleurgebruik komt ook uit het huidige platform. Voor de modules wordt geel en groen gebruikt. Deze kleuren komen terug bij de funfacts, de resultaten en het prikbord.
<img width="350" alt="image" src="https://github.com/user-attachments/assets/8fe678be-2fed-414d-98b5-6df7b385f50f" />
<img width="350" alt="image" src="https://github.com/user-attachments/assets/2c7542dd-434b-46a6-a2ee-5ec9275401b1" />

- Voor de layout heb ik het huidige platform aangehouden. Dus op mobiel een hamburger menu en menu balk onderin in het scherm. Op desktop klapt dit menu uit. 

### Responsive
De website is gebouwd met het mobile-first principe. Ik ben begonnen met het ontwerpen en bouwen van de mobiele versie van de website, en heb dit daarna voor desktop gebouwd. Zie onderstaand de verschillende layouts: 
<img src="https://github.com/user-attachments/assets/5326be2b-877c-4af3-8941-6b5197cdccaf" width="550" />

### Hierarchy of User Needs
Deze website, inclusief bijbehorende functionaliteiten zijn opgebouwd volgens de [Hierarchy of User Needs](https://www.nngroup.com/articles/theory-user-delight/). Dit is een model dat beschrijft aan welke basisvoorwaarden een digitale ervaring moet voldoen voordat het echt waardevol en betekenisvol wordt voor de gebruiker. Het bestaat uit verschillende niveaus die ik bij onderstaande, uitgelichte feature zal toelichten. 

#### "Match de feitjes"
##### 1 & 2 - Functional & Reliable
##### 3 - Usable 
##### 4 - Pleasurable 

## Kenmerken 
In dit project maak ik gebruik van Node.js en Express om een webserver op te zetten. Ik gebruik Liquid als template-engine voor het genereren van dynamische HTML-pagina's. Data wordt opgehaald via verschillende API-endpoints, zowel Directus als LearningStone API. 

### Routes en dataverwerking
- [`app.get("/")`](#): render de homepage via `index.liquid`.
- [`app.get("/profile")`](#): toont de profielpagina in `profile.liquid`.
- [`app.get("/game/start")`](#): toont het startscherm van het spel. Gerenderd met `game-start.liquid`.
- [`app.get("/game/play")`](#): haalt leden en hun bijbehorende funfacts op via LearningStone en Directus. Deze gegevens worden weergegeven in `game.liquid`, waar gebruikers funfacts aan groepsleden koppelen.
- [`app.post("/game/play")`](#): verwerkt de ingestuurde antwoorden van de gebruiker. Deze worden opgeslagen in de Directus database. Na opslaan wordt doorgestuurd naar de resultatenpagina.
- [`app.get("/game/results")`](#): haalt data op van de meest recente spelronde, vergelijkt antwoorden met juiste funfacts en toont resultaten in `game-results.liquid`.
- [`app.get("/notice-board")`](#): toont een overzicht van de laatst gespeelde ronde en antwoorden op het prikbord via `notice-board.liquid`.

### Data ophalen en HTML renderen 
De gegevens worden opgehaald via `fetch()` naar onder andere:
- `https://fdnd-agency.directus.app/items/learningstone_facts`
- `https://fdnd-agency.directus.app/items/learningstone_answers`
- LearningStone API's voor groepsleden en resources

### Voorbeelden:
- De route [`/game/play`](#) gebruikt `fetchMembers()` en `fetchFacts()` om data op te halen.
- De antwoorden worden verwerkt via `submitAnswers()` en opgeslagen in Directus.
- Resultaten worden berekend met `calculateGameResults()` en weergegeven in verschillende views (results en prikbord).

### Uitleg _NodeJS, Express en Liquid_
#### NodeJS
Met NodeJS kun je JavaScript op een server draaien. Hiermee kun je get en post request/responses bouwen om met bv. databases te communiceren. Zoals wij in dit project hebben gedaan.

#### Express
Express is een hulpmiddel binnen NodeJS, waarmee een webserver gebouwd kan worden. Je kunt bijvoorbeeld instellen welke pagina's en data getoond wordt.

#### Liquid
Liquid is een template-engine waarmee je dynamische HTML-pagina's kunt genereren.

## Installatie 
Zoals beschreven bij Kenmerken is bij dit project gebruik gemaakt van NodeJS. Om aan dit project te werken moet NodeJS geïnstalleerd zijn. Eenmal geïnstalleerd kan het project geopend worden in de code editor.

Voer in de terminal `npm install` uit om alle afhankelijkheden te installeren.

Voer vervolgens `npm start` uit om de server te starten.

Ga in je browser naar `http://localhost:8000` om het project te bekijken.

### Nodemon 
Om het werken makkelijker te maken is ook `nodemon` in dit project geïnstalleerd. Hiermee wordt de server automatisch opnieuw opgestart bij wijzigingen en hoeft dit niet meer handmatig gedaan te worden met `npm start`. 

Om met `nodemon` te werken, type `npm run dev` in de terminal.

## Bronnen 

## Licentie 
This project is licensed under the terms of the [MIT license](./LICENSE).
