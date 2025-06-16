const selectsSG = document.querySelectorAll("select");

// counter van 'geopende' <select>s
let openedCount = 0;

// voor elke select
selectsSG.forEach(select => {
  // luister naar "mousedown" event
  select.addEventListener("mousedown", () => {
    // zet transition-ed = true
    select.dataset.transitioned = "true";

    // en tel dit aan de counter op 
    openedCount++;

    // verwijder (mogelijke) eerder toegevoegde classes
    select.classList.remove("option-animated", "option-faster", "option-static");

    if (openedCount <= 5) {
      select.classList.add("option-animated");
    } else if (openedCount <= 10) {
      select.classList.add("option-faster");
    } else {
      select.classList.add("option-static");
    }
  });
});