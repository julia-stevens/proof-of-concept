De instructies voor deze opdracht staan in: [docs/INSTRUCTIONS.md](https://github.com/fdnd-task/proof-of-concept/blob/main/docs/INSTRUCTIONS.md)

# LearningStone - Functie om elkaar beter te leren kennen 
Ontwerp en maak een data driven online concept voor een opdrachtgever

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

## Inhoudsopgave
- [Beschrijving](#beschrijving)
- [Kenmerken](#kenmerken)
- [Installatie](#installatie)
- [Bronnen](#bronnen)
- [Licentie](#licentie)

## Beschrijving

### Ontwerpkeuzes
### Responsive

### Hierarchy of User Needs
Deze website, inclusief bijbehorende functionaliteiten zijn opgebouwd volgens de [Hierarchy of User Needs](https://www.nngroup.com/articles/theory-user-delight/). Dit is een model dat beschrijft aan welke basisvoorwaarden een digitale ervaring moet voldoen voordat het echt waardevol en betekenisvol wordt voor de gebruiker. Het bestaat uit verschillende niveaus die ik bij onderstaande, uitgelichte features zal toelichten. 

#### "Match de feitjes"
##### 1 & 2 - Functional & Reliable
##### 3 - Usable 
##### 4 - Pleasurable 

## Kenmerken 
In dit project maak ik gebruik van Node.js en Express om een webserver op te zetten. Ik gebruik Liquid als template-engine voor het genereren van dynamische HTML-pagina's.

### Routes en dataverwerking

### Data ophalen en HTML renderen 

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
