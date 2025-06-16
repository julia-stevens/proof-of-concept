// observer met IntersectionObserver
const observer = new IntersectionObserver(entries => {
  // loop door elementen die observed worden
    entries.forEach(entry => {
      // check of element in beeld is
      const intersecting = entry.isIntersecting;

      // niet in beeld = class offscreen
      if (!intersecting) {
        document.documentElement.classList.add("offscreen");
      } else { // wel in beeld = remove class offscreen
        document.documentElement.classList.remove("offscreen");
      }
    });
});

// haal header op
let header = document.querySelector("header");

// observe header element
observer.observe(header);