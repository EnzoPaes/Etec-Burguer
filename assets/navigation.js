const sideMenu = document.querySelector("aside");

document.addEventListener("click", (e) => {
    if (!e.path.includes(sideMenu)) {
        sideMenu.classList.remove("active");
    }
});

function menuToggle() {
    sideMenu.classList.toggle("active");
}