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
- [Code conventies](#code-conventies)
- [Installatie](#installatie)
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

### Toegankelijkheid 
Op verschillende manieren is rekeningen gehouden met de toegankelijkheid van de website: 
- Skip link om direct naar de belangrijkste content te gaan.
- Semantische HTML, zodat de website ook met het toetsenbord en screen reader te gebruiken is (getest in issue [`#33`](https://github.com/julia-stevens/proof-of-concept/issues/33)).
- Geen overbodige `alt` teksten, zodat screen readers niet dezelfde content gaan herhalen.
- Voldoende kleur contrast.

De toegankelijkheid, zoals hier beschreven staat, is allemaal getest en gedocumenteerd in issue [`#33`](https://github.com/julia-stevens/proof-of-concept/issues/33).

### Hierarchy of User Needs
Deze website, inclusief bijbehorende functionaliteiten zijn opgebouwd volgens de [Hierarchy of User Needs](https://www.nngroup.com/articles/theory-user-delight/). Dit is een model dat beschrijft aan welke basisvoorwaarden een digitale ervaring moet voldoen voordat het echt waardevol en betekenisvol wordt voor de gebruiker. Het bestaat uit verschillende niveaus die ik bij onderstaande, uitgelichte feature zal toelichten. 

In dit model komt ook het principe progressively enhanced terug. Hiermee wordt bedoeld dat een functie voor zoveel mogelijk gebruikers te gebruiken is. Dit begint dus bij een sterke basis, waarmee de functie al werkt en wordt per laag uitgebreid tot de laatste laag met pleasurables, voor een zo goed mogelijke gebruikerservaring. 

#### "Match de feitjes"
De "Match de feitjes" functie geeft gebruikers de mogelijkheid om ingestuurde funfacts te koppelen aan de juiste leden van de groep. Na het versturen van de antwoorden, ontvangt de gebruiker een overzicht van de resultaten en worden de resultaten gepost naar het prikbord. Voor nu is dat nog met tekst, in de toekomst zou dit met een grafiek kunnen worden uitgebreid. 

##### 1 & 2 - Functional & Reliable
In de basis laag was het belangrijk dat de core functionaliteit, het koppelen van de funfacts aan gebruikers en het verkregen van de resultaten, altijd werkt. Dit heb ik gedaan door semantische HTML te schrijven. Dit wil zeggen dat de functie met puur HTML werkt, maar ook draagt dit bij aan toegankelijkheid, namelijk beter navigeerbaar voor bijvoorbeeld screen readers. Daarnaast heb ik de huisstijl toegepast in eenvoudige CSS, die in verschillende browsers (nieuw en oud) ondersteund wordt. Dit heb ik getest in issue [`#35`](https://github.com/julia-stevens/proof-of-concept/issues/35). Hierin is dus ook de eerste stap van het progressively enhanced principe terug te zien. 

##### 3 - Usable 
De website is opgebouwd vanuit het mobile first principe en dus op verschillende schermbreedtes te gebruiken. Ook is er in deze laag aanvullende styling toegevoegd, zoals de member cards. Hierbij heb ik ervoor gezorgd dat het ingegeven antwoord altijd terug te zien is, ook als de nieuwste CSS niet wordt ondersteund. Zie onderstaande afbeelding ter illustratie: 

![image](https://github.com/user-attachments/assets/e634a5b2-f1ef-4625-aec0-be14d4493396)

Daarnaast heb ik in deze laag bij de resultaten pagina de goede/juiste antwoorden aan de hand van kleur onderscheden, zodat het direct te zien is of een antwoord goed of fout was. 

##### 4 - Pleasurable 
In de pleasurable laag heb ik allerlei enhancements toegevoegd: zo scrollen de header en het mobiel menu in/uit beeld op basis van het scroll gedrag van de gebruiker. De opties komen in beeld met een animatie, die ook sneller wordt en uiteindelijk stopt als een gebruiker meerdere keren het menu heeft geopened. Daarnaast heb ik view transitions toegepast, zodat o.a. de gekozen funfact met animatie in beeld verschijnt. En ziet de gebruiker een loading state, voordat de antwoorden verstuurd worden. Tot slot heb ik ook een scroll-driven animatie toegevoegd op de cards. Voor de visuals, zie het begin van de beschrijving. 

## Kenmerken 
In dit project maak ik gebruik van Node.js en Express om een webserver op te zetten. Ik gebruik Liquid als template-engine voor het genereren van dynamische HTML-pagina's. Data wordt opgehaald via verschillende API-endpoints, zowel Directus als LearningStone API. 

### Routes en dataverwerking
- [`app.get("/")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L27-L30): render de homepage via `index.liquid`.
- [`app.get("/profile")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L32-L35): toont de profielpagina in `profile.liquid`.
- [`app.get("/game/start")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L37-L40): toont het startscherm van het spel. Gerenderd met `game-start.liquid`.
- [`app.get("/game/play")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L42-L54): haalt leden en hun bijbehorende funfacts op via LearningStone en Directus. Deze gegevens worden weergegeven in `game.liquid`, waar gebruikers funfacts aan groepsleden koppelen.
- [`app.post("/game/play")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L56-L62): verwerkt de ingestuurde antwoorden van de gebruiker. Deze worden opgeslagen in de Directus database. Na opslaan wordt doorgestuurd naar de resultatenpagina.
- [`app.get("/game/results")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L64-L70): haalt data op van de meest recente spelronde, vergelijkt antwoorden met juiste funfacts en toont resultaten in `game-results.liquid`.
- [`app.get("/notice-board")`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L72-L78): toont een overzicht van de laatst gespeelde ronde en antwoorden op het prikbord via `notice-board.liquid`.

### Data ophalen en HTML renderen 
De gegevens worden opgehaald via `fetch()` naar onder andere:
- `https://fdnd-agency.directus.app/items/learningstone_facts`
- `https://fdnd-agency.directus.app/items/learningstone_answers`
- LearningStone API's voor groepsleden en resources

### Voorbeelden:
- De route [`/game/play`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L42-L54) gebruikt [`fetchMembers()`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L180-L202) en [`fetchFacts()`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L204-L219) om data op te halen.
- De antwoorden worden verwerkt via [`submitAnswers()`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L384-L434) en opgeslagen in Directus.
- Resultaten worden berekend met [`calculateGameResults()`](https://github.com/julia-stevens/proof-of-concept/blob/e322176c7a8124d0654a1186b7c5cb0f55351173/server.js#L291-L350) en weergegeven in verschillende views (results en prikbord).

### Uitleg _NodeJS, Express en Liquid_
#### NodeJS
Met NodeJS kun je JavaScript op een server draaien. Hiermee kun je get en post request/responses bouwen om met bv. databases te communiceren. Zoals wij in dit project hebben gedaan.

#### Express
Express is een hulpmiddel binnen NodeJS, waarmee een webserver gebouwd kan worden. Je kunt bijvoorbeeld instellen welke pagina's en data getoond wordt.

#### Liquid
Liquid is een template-engine waarmee je dynamische HTML-pagina's kunt genereren.

## Code conventies
### Ademruimte en inspringen in HTML
* Inspringen altijd met een tab
* Inline elementen op dezelfde regel
* Block elementen op aparte regels

### Volgorde en nesten van CSS selectors
* CSS gestructureerd op volgorde van HTML. Dus: start met `header`, daarna `nav`, etc. 
* Alle genesten elementen in HTML, zijn ook in CSS genest (onder de betreffende `section` `div` of `header` `nav` `footer`, etc.) en in volgorde van HTML

#### Nesten van media queries
* Alle media queries zijn genest in de betreffende CSS selectoren
* De media queries staan onderaan in de styling van de betreffende selector. 

### Naamgeving
* Kebab-casing in HTML en CSS
* CamelCase in JS met een beschrijvende naam voor de variabelen. 
* Naamgeving classes beschrijven (informatie) inhoud van betreffende sectie

### Server
* Zo veel mogelijk herhalende code in functies 
* eerste routes, daarna functie definiëren

## Installatie 
Zoals beschreven bij Kenmerken is bij dit project gebruik gemaakt van NodeJS. Om aan dit project te werken moet NodeJS geïnstalleerd zijn. Eenmal geïnstalleerd kan het project geopend worden in de code editor.

Voer in de terminal `npm install` uit om alle afhankelijkheden te installeren.

Voer vervolgens `npm start` uit om de server te starten.

Ga in je browser naar `http://localhost:8000` om het project te bekijken.

### Nodemon 
Om het werken makkelijker te maken is ook `nodemon` in dit project geïnstalleerd. Hiermee wordt de server automatisch opnieuw opgestart bij wijzigingen en hoeft dit niet meer handmatig gedaan te worden met `npm start`. 

Om met `nodemon` te werken, type `npm run dev` in de terminal.

## Licentie 
This project is licensed under the terms of the [MIT license](./LICENSE).
