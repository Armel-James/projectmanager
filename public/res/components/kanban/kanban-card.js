function renderNewTask(id, title, taskPercentage) {

    return `
        <div class="kanban-card card-priority-5" id="${id}">
            <div class="circle-notif-container"><div class="circle circle-active"></div></div>
            <div class="kanban-card-title">${title}</div>
            <div class="kanban-card-progress">
                <div class="progress-title">
                    <span>Progress:</span>
                    <span class="label-progress-percent text-bold-600">${taskPercentage}%</span>
                </div>
                <div class="progress-container">
                    <div class="progress-line" style="width: ${taskPercentage}%"></div>
                </div>
            </div>
        </div>
    `;
}

function addNewMainTask(btnOfPhaseElement, taskId, progress) {
    // get container
    const element = btnOfPhaseElement
    const progress = progress
    const cardContainer = element.parentElement.querySelector('.kanban-card-container');
    console.log(cardContainer);
    console.log(Element);
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
        cardContainer.insertAdjacentHTML('beforeend', renderNewTask(taskId, title, progress));

        const lastChild = cardContainer.children[cardContainer.children.length - 1];
        lastChild.addEventListener('click', () => {
            handleEditTask(lastChild);
        });
        hideAllModals();
    });

    titleInput.value = '';
}

export default renderNewTask;

/*
    CLASSES to use querySelector() for data modification

    - Task Title:                   kanban-card-title
    - Percent indicator:            label-progress-percent
    - Progress Line:                progress-line

*/