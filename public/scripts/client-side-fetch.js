// controleer of de browser 'fetch' en 'DOMParser' ondersteunt
if ("fetch" in window && "DOMParser" in window) {
  // luister naar het "submit" event 
    document.addEventListener("submit", function (event) {
      // sla het formulier op dat verstuurd wordt
      const form = event.target;

      // als formulier geen data-enhanced heeft, return
      if (!form.hasAttribute("data-enhanced")) return;

      // voeg loading class toe
      form.classList.add("loading");

      // verwijder loading class na 3s
      setTimeout(() => {
          form.classList.remove("loading");
      }, 3000); 
    });
}  