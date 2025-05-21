// Add phase
function AddPhase() {
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
}

// Edit phase
function editPhase() {
    const editPhase = document.querySelectorAll(".kanban-col").forEach((div) => {
        const coldiv = div.id;
        const btndiv = div.querySelector('button');
        // const btnname = btndiv.setAttribute('id', `${coldiv}`)
        // console.log(coldiv)
        // console.log(`button of ${btndiv.parentElement.parentElement.id}`)
        div.querySelector("button").addEventListener('click', () => {
            console.log(`button of ${coldiv}`)
            // btndiv
            showActionModal(btndiv)
        })
    })
}