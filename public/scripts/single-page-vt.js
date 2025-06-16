// check of view transition API ondersteunt wordt, anders alert 
if (!document.startViewTransition) {
  alert(
    "Your browser does not support view transitions so this pen will not work in your browser, it does work in any modern Chromium browser!"
  );
}

const selectedContents = document.querySelectorAll("selectedcontent");
const selectsVT = document.querySelectorAll(".funfact-select");

// voeg class vt-supported toe aan alle <selectedcontent>s
selectedContents.forEach(selectedContent => {
  selectedContent.classList.add("vt-supported");
});

// voor elke select
selectsVT.forEach(select => {
  // luister naar "change" event 
  select.addEventListener("change", () => {
    // haal specifieke <selectedcontent> op
    const chosenOptionContainer = select.querySelector("selectedcontent"); 

    document.startViewTransition(() => {
      // haal gekozen option op 
      const selectedOption = select.options[select.selectedIndex];

      // voeg tekst van gekozen option toe
      chosenOptionContainer.textContent = selectedOption.textContent;

      // voeg class "visible" toe
      chosenOptionContainer.classList.add("visible");
    });
  });
});