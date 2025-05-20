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
    showEditPhaseNameModal(document.querySelector(".add-tab-button"))
})
function showEditPhaseNameModal(button, label) {
    editTarget = button;
    positionModal(document.getElementById('editModal'), button);
    setNameNewPhase(label)
}
function setNameNewPhase(phaseLabel) {
    document.getElementById('editConfirmBtn').addEventListener('click', function () {
        var input = document.getElementById('editInput');
        // var phaseLabel = editTarget.parentElement.querySelector("#phaseLabel");
            phaseLabel = input.value;
            editTarget = null;
    document.querySelector(".kanban-container").innerHTML += renderNewPhase(phaseLabel);
        hideAllModals();
    });
}
function renderNewPhase(phaseName) {
    return `<div class="kanban-col" id="pending-col">
                            <div class="col-category">
                                <div id="${phaseName}">${phaseName}</div>
                                <button>
                                    <svg class="col-more" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/><circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/><circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="currentColor"/></svg>
                                </button>
                            </div>
                            <div class="card-container"></div>
                            <button class="new-task-button">Add New Task</button>
                        </div>`;
}

// Edit phase
const editPhase = document.querySelectorAll(".kanban-col").forEach((div) => {
    const coldiv = div.id;
    const btndiv = div.querySelector('button')
    // const btnname = btndiv.setAttribute('id', `${coldiv}`)
    console.log(coldiv)
    console.log(`button of ${btndiv.parentElement.parentElement.id}`)
    div.querySelector("button").addEventListener('click', () => {
        console.log(`button of ${coldiv}`)
        // btndiv
        showActionModal(btndiv)
        editmodal(div.querySelector("div div #phaseLabel"))
    })
})

// editPhase.addEventListener('click', () => {
//     console.log("dftyuio")
// })


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
}

var deleteTarget = null;
var editTarget = null;
var editCreateTarget = null;

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
// document.getElementById('editConfirmBtn').addEventListener('click', function () {
//     var input = document.getElementById('editInput');
//         phaseLabel.textContent = input.value;
//         document.querySelector(".kanban-container").innerHTML += renderNewPhase(phaseLabel);
//         editTarget = null;
//     hideAllModals();
// });

document.getElementById('actionClose').addEventListener('click', hideAllModals);
document.getElementById('confirmClose').addEventListener('click', hideAllModals);
document.getElementById('editClose').addEventListener('click', hideAllModals);

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
        input.value = editTarget.textContent;
        positionModal(document.getElementById('editModal'), editTarget);
    }
});

function editmodal(phaseLabel) {
document.getElementById('editConfirmBtn').addEventListener('click', function () {
    var input = document.getElementById('editInput');
    // var phaseLabel = editTarget.parentElement.querySelector("#phaseLabel");
    if (phaseLabel !== null) {
        phaseLabel.textContent = input.value;
        editTarget = null;
    }
    hideAllModals();
});
}

// ================ Real-time ==================
// Reference to collection
monitorAuthState(async (user) => {
    const colRef = collection(db, "users", user.uid, "Projects", docId, "Phases");
    const userRef = doc(db, "users", auth.currentUser.uid);

    // console.log(auth.currentUser.uid);
    // const projectsRef = collection(userRef, "Projects", docId, "Phases");
    // const dref = setDoc(doc(projectsRef), {}, { merge: true })

    // Real-time listener using onSnapshot and .docChanges()
    onSnapshot(colRef, (querySnapshot) => {
        querySnapshot.docChanges().forEach((change) => {
            const docId = change.doc.id;
            const data = change.doc.data();

            // Create a DOM element ID based on document ID (to avoid duplicates)
            const listItemId = `doc-${docId}`;

            if (change.type === "added") {
                console.log(`ADDED: ${docId} - ${JSON.stringify(data)}`)
            }

            if (change.type === "modified") {
                // Update the existing DOM item
                const li = document.getElementById(docId);
                if (li) li.textContent = `MODIFIED: ${docId} - ${JSON.stringify(data)}`;
            }

            if (change.type === "deleted") {
                // Remove item from the DOM
                const li = div.getElementById(docId);
                console.log(li)
                if (li) li.remove();
            }
        });
    });
})
const params = new URLSearchParams(window.location.search);
const docId = params.get("docId");
console.log("Document ID:", docId);

// =============================================

import { auth, db } from "./firebase/firebase-config.js";
import { signOutUser, monitorAuthState } from "../scripts/firebase/auth.js";
import { doc, collection, onSnapshot, setDoc, getDocs, deleteDoc } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-firestore.js";