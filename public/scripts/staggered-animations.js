let openedCount = 0;

document.querySelectorAll("select").forEach(select => {
  select.addEventListener("click", () => {

    if (select.dataset.transitioned) return;

    select.dataset.transitioned = "true"; 
    openedCount++;

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