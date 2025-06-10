document.addEventListener('DOMContentLoaded', () => {
    // selecteer alle dropdown-elementen 
    const allSelects = document.querySelectorAll('.funfact-select'); 
  
    // loop door elk select-element en voeg een 'change' event listener toe
    allSelects.forEach(selectElement => {
      selectElement.addEventListener('change', () => {
        // roep de functie aan 
        updateDropdowns();
      });
    });
  
    // functie om de opties in alle dropdowns te updaten (uitschakelen/inschakelen)
    function updateDropdowns() {
      // maak een nieuwe Set aan om geselecteerde waarden bij te houden
      const selectedValues = new Set(); 
  
      // 1. verzamel alle 'funfact' ID's die in de huidige dropdowns zijn geselecteerd
      allSelects.forEach(selectElement => {
        // controleer of de geselecteerde waarde niet de 'start' placeholder is
        if (selectElement.value !== 'start') { 
          // voeg de geselecteerde waarde toe aan de Set
          selectedValues.add(selectElement.value);
        }
      });
  
      // 2. loop door elke dropdown opnieuw om de opties aan te passen
      allSelects.forEach(currentSelect => {
        // haal alle 'option' elementen op binnen de huidige dropdown
        const options = currentSelect.querySelectorAll('option');
  
        // loop door elke optie in de huidige dropdown
        options.forEach(option => {
          // als de waarde van de optie 'start' is, zorg er dan voor dat deze altijd ingeschakeld is en sla de rest over
          if (option.value === 'start') {
            option.disabled = false; 
            return;
          }
  
          // als de waarde van deze optie al is geselecteerd in een ándere dropdown
          // EN het is NIET de optie die momenteel is geselecteerd in specifieke dropdown,
          // schakel deze optie dan uit.
          if (selectedValues.has(option.value) && option.value !== currentSelect.value) {
            option.style.display = 'none'; 
          } else {
            // anders, zorg ervoor dat de optie is ingeschakeld (en zichtbaar is)
            option.style.display = 'flex'; 
          }
        });
      });
    }
  
    // roep updateDropdowns één keer aan bij het laden van de pagina.
    updateDropdowns();
});