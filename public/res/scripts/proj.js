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
        // console.log(button);
        if (elem == button && !button.classList.contains("active-item")) {
            button.classList.add("active-item");
        } else if (elem != button && button.classList.contains("active-item")) {
            button.classList.remove("active-item");
        }
    })
}

// Add phase
const addPhase = document.querySelector(".add-tab-button");
addPhase.addEventListener('click', () => {
    const kanbanCont = document.querySelector(".kanban-container")
    kanbanCont.insertAdjacentHTML('beforeend', renderNewPhase())
    // Add click event to new phase
    const newCol = kanbanCont.lastChild;
    const moreBtn = newCol.querySelector('.col-category').querySelector('button');
    const addNewTaskBtn = newCol.querySelector('.new-task-button');
    //console.log(btn);
    moreBtn.addEventListener('click', () => {
        showActionModal(moreBtn)
    });

    addNewTaskBtn.addEventListener('click', () => {
        handleAddNewTask(addNewTaskBtn);
        console.log('event set to new task button');
    });

    //document.querySelector(".kanban-container").innerHTML += renderNewPhase();
})

function renderNewPhase() {
    return `<div class="kanban-col" id="pending-col">
                <div class="col-category">
                    <div id="phaseLabel">Pending</div>
                    <button>
                        <svg class="col-more" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/><circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/><circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="currentColor"/></svg>
                    </button>
                </div>
                <div class="kanban-card-container"></div>
                <button class="new-task-button">Add New Task</button>
            </div>`;
}

// Edit phase
const editPhase = document.querySelectorAll(".kanban-col").forEach((div) => {
    const coldiv = div.id;
    const btndiv = div.querySelector('button')
    // const btnname = btndiv.setAttribute('id', `${coldiv}`)
    // console.log(coldiv)
    // console.log(`button of ${btndiv.parentElement.parentElement.id}`)
    div.querySelector("button").addEventListener('click', () => {
        console.log(`button of ${coldiv}`)
        // btndiv
        showActionModal(btndiv)
    })
})


// Edit Phase Modal options
function positionModal(modal, trigger) {
    var rect = trigger.getBoundingClientRect();
    modal.style.left = rect.left + window.scrollX + 'px';
    modal.style.top = rect.bottom + window.scrollY + 8 + 'px';
    modal.style.display = 'block';
}

function hideAllModals() {
    document.getElementById('actionModal').style.display = 'none';
    document.getElementById('confirmModal').style.display = 'none';
    document.getElementById('editModal').style.display = 'none';
    document.querySelectorAll('.modal-wrapper').forEach(element => {
        element.style.display = 'none';
    });
}

var deleteTarget = null;
var editTarget = null;

// var triggers = document.querySelectorAll('.trigger-btn');
// for (var i = 0; i < triggers.length; i++) {
//     (function (button) {
//         button.addEventListener('click', function () {
//             hideAllModals();
//             showActionModal(button);
//         });
//     })(triggers[i]);
// }

function showActionModal(button) {
    deleteTarget = button;
    editTarget = button;
    positionModal(document.getElementById('actionModal'), button);
}

document.getElementById('actionClose').addEventListener('click', hideAllModals);
document.getElementById('confirmClose').addEventListener('click', hideAllModals);
document.getElementById('editClose').addEventListener('click', hideAllModals);
document.getElementById('newTaskClose').addEventListener('click', hideAllModals);

document.getElementById('deleteBtn').addEventListener('click', function () {
    hideAllModals();
    if (deleteTarget !== null) {
        positionModal(document.getElementById('confirmModal'), deleteTarget);
    }
});

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (deleteTarget !== null) {
        deleteTarget.parentElement.parentElement.remove();
        deleteTarget = null;
    }
    hideAllModals();
});

document.getElementById('editBtn').addEventListener('click', function () {
    hideAllModals();
    if (editTarget !== null) {
        var input = document.getElementById('editInput');
        // input.value = editTarget.textContent;
        positionModal(document.getElementById('editModal'), editTarget);
    }
});

document.getElementById('editConfirmBtn').addEventListener('click', function () {
    var input = document.getElementById('editInput');
    var phaseLabel = editTarget.parentElement.querySelector("#phaseLabel");
    if (phaseLabel !== null) {
        phaseLabel.textContent = input.value;
        editTarget = null;
    }
    hideAllModals();
});

// Add new Task modal
document.querySelectorAll('.new-task-button').forEach(element => {
    element.addEventListener('click', () => {
        handleAddNewTask(element)
    });
});

function handleAddNewTask(element) {
        // get container
        const cardContainer = element.parentElement.querySelector('.kanban-card-container');
        console.log(cardContainer);
        console.log(element);
        const modalWrapper = document.getElementById('newTaskModalWrapper')
        modalWrapper.style.display = 'flex';
        modalWrapper.querySelector('.modal-columnName').textContent = cardContainer.parentElement.querySelector('#phaseLabel').textContent;
        
        // replace button w/ new one
        const addButton = modalWrapper.querySelector('.confirm-btn');
        const newAddButton = document.createElement('button');
        newAddButton.classList.add('confirm-btn');
        newAddButton.textContent = 'Create New';
        addButton.parentElement.replaceChild(newAddButton, addButton);

        // add event to new button
        const titleInput = modalWrapper.querySelector('.new-task-title');
        newAddButton.addEventListener('click', () => {
            const title = titleInput.value;
            cardContainer.insertAdjacentHTML('beforeend', renderNewTask(title));
            hideAllModals();
        });

        titleInput.value = '';
}

function renderNewTask(title) {
    return `
        <div class="kanban-card card-priority-5">
            <div class="circle-notif-container"><div class="circle circle-active"></div></div>
            <div class="kanban-card-title">${title}</div>
            <div class="kanban-card-progress">
                <div class="progress-title">
                    <span>Progress:</span>
                    <span class="text-bold-600">0%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-line progress-0"></div>
                </div>
            </div>
        </div>
    `;
}