if (!document.startViewTransition) {
    alert(
      "Your browser does not support view transitions so this pen will not work in your browser, it does work in any modern Chromium browser!"
    );
  }

  const selectedContents = document.querySelectorAll("selectedcontent");

  selectedContents.forEach(selectedContent => {
    selectedContent.classList.add("vt-supported");
  });

  const selects = document.querySelectorAll(".funfact-select");
  
  selects.forEach(select => {
    select.addEventListener("change", () => {
      // Find the selectedcontent inside this select (since it"s inside button inside select)
      const chosenOptionContainer = select.querySelector("selectedcontent"); 
  
      if (!chosenOptionContainer) return;
  
      document.startViewTransition(() => {
        const selectedOption = select.options[select.selectedIndex];
        chosenOptionContainer.textContent = selectedOption.textContent;
        chosenOptionContainer.classList.add("visible");
      });
    });
  });