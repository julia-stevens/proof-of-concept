if ("fetch" in window && "DOMParser" in window) {
    document.addEventListener("submit", function (event) {
      const form = event.target;

      if (!form.hasAttribute("data-enhanced")) return;

      form.classList.add("loading");

      setTimeout(() => {
          form.classList.remove("loading");
      }, 3000); 
    });
}



  