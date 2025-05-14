import removeLoader from "../components/loader/loader.js";

const loader = querySelector(".loader-container");

window.addEventListener('onLoad', () => {
    removeLoader(loader);
})