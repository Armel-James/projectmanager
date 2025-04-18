/* Overflow styling */
const div = document.getElementById('projectsContainer');

function checkOverflow() {
    if (div.scrollHeight > div.clientHeight) {
        div.classList.add('overflow-height');
    }
    else {
        div.classList.remove('overflow-height');
    }
}

checkOverflow();
window.addEventListener('resize', checkOverflow);