const selects = document.querySelectorAll(".funfact-select");
const resetButtons = document.querySelectorAll(".reset-select");

// loop door elke select en reset knop
selects.forEach((select, i) => {
  // luister naar "change" event
  select.addEventListener("change", updateDropdowns);
  
  // luister naar "click" event op reset knop
  resetButtons[i].addEventListener("click", () => {
    // value naar start
    select.value = "start";

    // roep updateDropdowns functie aan
    updateDropdowns();
  });
});

function updateDropdowns() {
  // maak een Set van alle gekozen waarden (behalve start)
  const selectedValues = new Set( 
    Array.from(selects) // zet om in array
      .map(select => select.value) // haal bij elke select de value op (en zet in array)
      .filter(value => value !== "start") // filter op waarden die niet gelijk zijn aan "start"
  );

  // voor elke select
  selects.forEach((select, i) => {
    // alle options
    const options = select.querySelectorAll("option");

    // met bijbehorende reset knop
    const resetButton = resetButtons[i];
    
    // value = start, opacity 0, anders opacity 1
    if (select.value === "start") {
      resetButton.style.opacity = "0";
    } else {
      resetButton.style.opacity = "1";
    }
    
    // loop door alle opties
    options.forEach(option => {
      // start value is beschikbaar
      if (option.value === "start") {
        option.disabled = false;
      } else { 
        // check of option al gekozen is
        const isSelected = selectedValues.has(option.value);

        // check of geselecteerde option bij dit menu hoort
        const isCurrentSelection = option.value === select.value;
        
        // als geselecteerde option al bij een ander menu gekozen is, dan display none, anders display flex
        if (isSelected && !isCurrentSelection) {
          option.style.display = "none";
        } else {
          option.style.display = "flex";
        }
      }
    });
  });
}