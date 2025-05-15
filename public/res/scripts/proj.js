import removeLoader from "../components/loader/loader.js";

// Loader
const loader = document.querySelector(".loader-container");

window.addEventListener('load', () => {
    removeLoader(loader);
})

// TabView UI functionalities
const contents = document.querySelectorAll(".content");
const buttons = document.querySelector(".side-navigation-btn-list").querySelectorAll("button")

toggleView(0, buttons[0]);

buttons.forEach((element, index) => {
    element.addEventListener('click', (e) => {
        toggleView(index, element);
    })
});

function toggleView(i, elem) {
    contents.forEach((content, index) =>{
        if (i === index && content.classList.contains("d-none")) {
            content.classList.remove("d-none");
        } else if (i !== index && !content.classList.contains("d.none")){
            content.classList.add("d-none");
        }
    })

    buttons.forEach((button) => {
        console.log(button);
        if (elem == button && !button.classList.contains("active-item")) {
            button.classList.add("active-item");
        } else if (elem != button && button.classList.contains("active-item")) {
            button.classList.remove("active-item");
        }
    })
}