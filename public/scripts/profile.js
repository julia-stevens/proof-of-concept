const fileInput = document.querySelector(`input[type="file"]`);

fileInput.addEventListener("change", handleFiles, false);

function handleFiles() {
    const file = this.files[0];
    const fileURL = URL.createObjectURL(file);
    const fileInputLabel = document.querySelector(".profile-pic-input label");

    fileInputLabel.style.setProperty("background-image", `url(${fileURL})`);
    fileInputLabel.style.setProperty("color", "white");
}
