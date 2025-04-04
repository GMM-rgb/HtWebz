let closeFormatControls = document.getElementById("closeFormatingControls");
const formatingControls = document.getElementById("formatingControls");

function waitFormatControls(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

closeFormatControls.onclick = () => {
    if (formatingControls.style.display === "flex" || formatingControls.style.display === "") {
        formatingControls.classList.add("fadeOutAnimationFormater");
        waitFormatControls(650).then(() => {
            formatingControls.classList.remove("fadeOutAnimationFormater");
            formatingControls.style.display = "none";
        });
    }
}
