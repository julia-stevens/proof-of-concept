const fileInput = document.querySelector(`input[type="file"]`);

// luister naar "change" event op de file input
fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    // eerst gekozen bestand uit lijst
    const file = this.files[0];

    // maak URL aan voor gekozen bestand
    const fileURL = URL.createObjectURL(file);

    // haal label op (uit de file input)
    const fileInputLabel = document.querySelector(".profile-pic-input label");

    // achtergrond afbeelding met URL van gekozen bestand
    fileInputLabel.style.setProperty("background-image", `url(${fileURL})`);

    // tekst kleur wit
    fileInputLabel.style.setProperty("color", "white");
}
