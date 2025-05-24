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
        if (elem == button && !button.classList.contains("active-item")) {
            button.classList.add("active-item");
        } else if (elem != button && button.classList.contains("active-item")) {
            button.classList.remove("active-item");
        }
    })
}




import renderKanbanColumn from '../components/kanban/kanban-col.js' 
import renderNewTask from '../components/kanban/kanban-card.js'
import {getPhaseIndexId, getTaskId, getTaskObject} from '../scripts/utils.js'

// Needed for local dynamic data
var phaseIdIndexCounter = 0;
const phases = [];

addSampleDataToKanban();

// Add phase
const addPhase = document.querySelector(".add-tab-button");
addPhase.addEventListener('click', () => handleAddNewPhase())

function handleAddNewPhase(phaseTitle) {
    // const colRef = collection(db, "users", auth.currentUser.uid, "Projects", docId, "Phases");
    // phaseTitle param is temporary 

    // JSON
    let phase = {
        indexId: phaseIdIndexCounter,
        phaseId: `phase-${phaseIdIndexCounter}`,
        title: phaseTitle,
        taskIndexCounter: 0,
        tasks: []
    }
    
    const kanbanCont = document.querySelector(".kanban-container")
    kanbanCont.insertAdjacentHTML('beforeend', renderKanbanColumn(phase.phaseId, phase.title))
    // Add click event to new phase
    const newCol = kanbanCont.lastChild;
    const moreBtn = newCol.querySelector('.col-category').querySelector('button');
    const addNewTaskBtn = document.getElementById(`btn-addtask-${phase.phaseId}`);

    moreBtn.addEventListener('click', () => {
        showActionModal(moreBtn)
    });

    addNewTaskBtn.addEventListener('click', () => {
        handleAddNewTask(phase); 
    });

    phases.push(phase);
    phaseIdIndexCounter += 1;
}

function addSampleDataToKanban() {
    let phasetitles = ['Requirements', 'Planning', 'Designing', 'Implementation', 'Execution']
    phasetitles.forEach((value) => {
        handleAddNewPhase(value);
    });
}

// Edit phase
const editPhase = document.querySelectorAll(".kanban-col").forEach((div) => {
    const coldiv = div.id;
    const btndiv = div.querySelector('button');
    // const btnname = btndiv.setAttribute('id', `${coldiv}`)
    // console.log(coldiv)
    // console.log(`button of ${btndiv.parentElement.parentElement.id}`)
    div.querySelector("button").addEventListener('click', () => {
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
document.getElementById('editTaskClose').addEventListener('click', hideAllModals);

document.getElementById('deleteBtn').addEventListener('click', function () {
    hideAllModals();
    if (deleteTarget !== null) {
        positionModal(document.getElementById('confirmModal'), deleteTarget);
    }
});

document.getElementById('confirmDeleteBtn').addEventListener('click', function () {
    if (deleteTarget !== null) {
        const kanbanCol = deleteTarget.closest('.kanban-col');
        const phaseIndex = phases.findIndex(phase => phase.phaseId === kanbanCol.id)
        phases.splice(phaseIndex, 1);
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
    var phaseLabel = editTarget.parentElement.querySelector(".phase-name");
    if (phaseLabel !== null) {
        const phase = phases.find(phase => phase.phaseId == editTarget.closest('.kanban-col').id);
        phase.title = input.value
        phaseLabel.textContent = phase.title;
        editTarget = null;
    }
    hideAllModals();
});

document.querySelectorAll('.kanban-card').forEach(element => {
    element.addEventListener('click', () => {
        handleEditTask(element);
    });
})

function handleAddNewTask(phase) {
        // get phase element
        const phaseElement = document.getElementById(phase.phaseId);
        const cardContainer = phaseElement.querySelector('.kanban-card-container');
        
        const modalWrapper = document.getElementById('newTaskModalWrapper')
        modalWrapper.style.display = 'flex';

        modalWrapper.querySelector('.modal-columnName').textContent = phaseElement.querySelector('.phase-name').textContent;
        
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
            const task = {
                phase: phase.indexId,
                id: phase.taskIndexCounter,
                title: title,
                assignees: [],
                percentage: 0,
                start: '',
                end: '',
                description: '',
                requirementIndexCounter: 0,
                requirements: []
            }

            cardContainer.insertAdjacentHTML('beforeend', renderNewTask(task, phase.indexId));

            const newCard = document.getElementById(`ph-${phase.indexId}-task-${task.id}`);
            newCard.addEventListener('click', () => {
                handleEditTask(newCard);
            });
            hideAllModals();
            
            phase.tasks.push(task);
            phase.taskIndexCounter += 1;
        });

        titleInput.value = '';
}



import {renderCounterListItem, renderToggleListItem} from '../components/kanban/req-item.js';

function handleEditTask(currentTaskCard) {
    document.getElementById('editTaskModalWrapper').style.display = 'flex';
    document.getElementById('modalCurrentTaskElementId').value = currentTaskCard.id;
    document.getElementById('req-container').querySelectorAll('.req-item').forEach(element => {
        element.remove();
    });

    const task = getTaskObject(phases, currentTaskCard.id);
    const editTaskModal = document.getElementById('editTaskModalWrapper');

    editTaskModal.querySelector('.my-modal-title-text').textContent = task.title;
    editTaskModal.querySelector('.task-description').value = task.description;
    editTaskModal.querySelector('.sched-start').value = task.start;
    editTaskModal.querySelector('.sched-end').value = task.end;
    var position = 0;
    const requirementContainer = document.getElementById('req-container');

    task.requirements.forEach(req => {
        if (req.isCounterOrToggle == 'Toggle')
            requirementContainer.insertAdjacentHTML('beforeend', renderToggleListItem(currentTaskCard.id, position, req));
        else if (req.isCounterOrToggle == 'Counter'){
            requirementContainer.insertAdjacentHTML('beforeend', renderCounterListItem(req));
        }
        let deletebtn = requirementContainer.lastElementChild.querySelector('.delete-btn');
        deletebtn.addEventListener('click', () => {
            deletebtn.closest('.req-item').remove();
        })
        position += 1;
    });
    /*
        let requirementToggle = {
            id:0,
            description: '',
            isCounterOrToggle: 'Toggle',
            state: true
        }

        let requirementCounter = {
            id:0,
            description: '',
            isCounterOrToggle: 'Counter',
            current: 0,
            target: 1
        }
    */
    // 
    // requirementContainer.querySelectorAll('*').forEach(req => req.remove());
    // task.requirements.forEach(requirement => {
    //     if (requirement.isCounterOrToggle === 'Counter'){

    //         requirementContainer.insertAdjacentHTML('beforeend', renderCounterListItem());
    //     } else if (requirement.isCounterOrToggle === 'Toggle') {
    //         requirementContainer.insertAdjacentHTML('beforeend', renderToggleListItem(requirement));
    //     }
    //     else {
    //         return;
    //     }

    //     task.requirementIndexCounter += 1;
    // })
}

// To delete
var id = 0;

// Requirements Dropdown
document.getElementById('requirements-dropdown').addEventListener('click', () => toggleDropDown());
const content = document.getElementById('myDropdownContent').querySelectorAll('.dropdown-option');

document.getElementById('myDropdownContent').querySelectorAll('.dropdown-option').forEach(element => {
    element.addEventListener('click', () => {
        toggleDropDown();
        const currentTaskCardId = document.getElementById('modalCurrentTaskElementId').value;
        const reqContainer = document.getElementById('req-container');
        let reqCount = reqContainer.childElementCount;
        /*
            let requirementToggle = {
                id:0,
                description: '',
                isCounterOrToggle: 'Toggle',
                state: true
            }

            let requirementCounter = {
                id:0,
                description: '',
                isCounterOrToggle: 'Counter',
                current: 0,
                target: 1
            }
        */

        if (element.textContent === 'Counter'){
            reqContainer.insertAdjacentHTML('beforeend', renderCounterListItem());
        }
        else if (element.textContent === 'Toggle'){
            reqContainer.insertAdjacentHTML('beforeend', renderToggleListItem(currentTaskCardId, reqCount));
        }
        const deleteBtn = reqContainer.lastElementChild.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', () => {
            deleteBtn.closest('.req-item').remove();
        });

        reqCount += 1;
        id += 1;
    })
});

function toggleDropDown() {
    const ddContent = document.getElementById('myDropdownContent');
    if (ddContent.style.display === 'flex')
        ddContent.style.display = 'none';
    else
        ddContent.style.display = 'flex';
}


const editModal = document.getElementById('editTaskModalWrapper');
document.getElementById('editTaskSave').addEventListener('click', () => handleSaveTask());

function handleSaveTask() {
    const taskCardId = document.getElementById('modalCurrentTaskElementId').value;
     
    const taskObj = getTaskObject(phases, taskCardId);
    taskObj.description = editModal.querySelector('.task-description').value;
    taskObj.start = editModal.querySelector('.sched-start').value;
    taskObj.end =editModal.querySelector('.sched-end').value;

    let reqs = []
    let allTasks = 0;
    let doneTasks = 0;

    document.getElementById('req-container').querySelectorAll('.req-item').forEach(reqElem => {
         
        if (reqElem.classList.contains('req-toggle-type')) {
            
            let reqToggleItem = {
                description: reqElem.querySelector('.req-desc-input').value,
                isCounterOrToggle: 'Toggle',
                state: reqElem.querySelector('.checkbox-complete-state').checked
            }
            reqs.push(reqToggleItem);
            allTasks += 1;
            if(reqToggleItem.state==true) doneTasks+=1
        } else if (reqElem.classList.contains('req-count-type')) {
            
            let reqCountItem = {
                description: reqElem.querySelector('.req-desc-input').value,
                isCounterOrToggle: 'Counter',
                current: reqElem.querySelector('.input-current').value,
                target: reqElem.querySelector('.input-target').value
            }
            reqs.push(reqCountItem);
            allTasks += Number(reqCountItem.target);
            doneTasks += Number(reqCountItem.current)
        }
    });
    taskObj.requirements = reqs;


    let percentage = (100 / allTasks) * doneTasks
    taskObj.percentage = Math.ceil(percentage)

    // console.log(document.getElementById(`ph-${taskObj.phase}-task-${taskObj.id}`).querySelector("#label-progress-percent").textContent)
    document.getElementById(`ph-${taskObj.phase}-task-${taskObj.id}`).querySelector(".label-progress-percent").textContent = `${taskObj.percentage}%`
    document.getElementById(`ph-${taskObj.phase}-task-${taskObj.id}`).querySelector(".progress-line").setAttribute("style", `width: ${taskObj.percentage}%`)

    console.log(allTasks)
    console.log(doneTasks)
    console.log(taskObj);

    hideAllModals();
}

document.getElementById('add-row-member').addEventListener('click', addRow);
function addRow() {
            // Get input values
            const id = document.getElementById("id").value;
            const name = document.getElementById("name").value;
            const email = document.getElementById("email").value;
            const role = document.getElementById("role").value;
            const status = document.getElementById("status").value;

            // Check if all fields are filled
            if (!id || !name || !email || !role || !status) {
                alert("Please fill in all fields!");
                return;
            }

            // Create new row
            const table = document.getElementById("detailsTable").getElementsByTagName('tbody')[0];
            const newRow = table.insertRow();

            // Insert new cells and data
            newRow.insertCell(0).textContent = id;
            newRow.insertCell(1).textContent = name;
            newRow.insertCell(2).textContent = email;
            newRow.insertCell(3).textContent = role;
            newRow.insertCell(4).textContent = status;

            // Add Delete button
            const deleteCell = newRow.insertCell(5);
            const deleteButton = document.createElement("button");
            deleteButton.textContent = "Delete";
            deleteButton.className = "btn btn-danger btn-sm";
            deleteButton.onclick = function() {
                table.deleteRow(newRow.rowIndex - 1); // Remove the row
            };
            deleteCell.appendChild(deleteButton);

            // Clear input fields after adding row
            document.getElementById("id").value = "";
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("role").value = "";
            document.getElementById("status").value = "";
        }














// ================ Real-time ==================
// Reference to collection
monitorAuthState(async (user) => {
    const userRef = doc(db, "users", auth.currentUser.uid);

    const colRef = collection(db, "users", user.uid, "Projects", docId, "Phases");
    // console.log(JSON.stringify(getDocs(colRef)))

    // console.log(auth.currentUser.uid);
    // const projectsRef = collection(userRef, "Projects", docId, "Phases");
    // const dref = setDoc(doc(projectsRef), {}, { merge: true })

    // Real-time listener using onSnapshot and .docChanges()
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            const docId1 = change.doc.id;
            const data = change.doc.data();

            // Create a DOM element ID based on document ID (to avoid duplicates)
            const listItemId = `doc-${docId}`;

            if (change.type === "added") {
                console.log(`ADDED: ${docId1} - ${JSON.stringify(data)}`)
            }

            if (change.type === "modified") {
                // Update the existing DOM item
                const li = document.getElementById(docId);
                if (li) li.textContent = `MODIFIED: ${docId} - ${JSON.stringify(data)}`;
            }

            if (change.type === "removed") {
                // Remove item from the DOM
                // const li = div.getElementById(docId);
                // console.log(li)
                console.log(`DELETED: ${docId} - ${JSON.stringify(data)}`)
                // if (li) li.remove();
            }
        });
    });
})
const params = new URLSearchParams(window.location.search);
const docId = params.get("docId");
//console.log("Document ID:", docId);

// =============================================

import { auth, db } from "./firebase/firebase-config.js";
import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";
import { doc, collection, onSnapshot, setDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";
