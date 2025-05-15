import removeLoader from "../components/loader/loader.js";

// Loader
const loader = document.querySelector(".loader-container");

window.addEventListener('load', () => {
    removeLoader(loader);
})

// TabView functionalities
const contents = document.querySelectorAll(".content");
contents.forEach((element) => {
    element.addEventListener('click', () => {

    })
});

function toggleView() {
    
}