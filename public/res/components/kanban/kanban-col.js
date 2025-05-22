
function renderKanbanColumn(phaseid, phaseName) {

    const newTaskButtonId = 'btn-addtask-' + phaseid;

    return `<div class="kanban-col" id="${phaseid}">
    
                <div class="col-category">
                    <div class="phase-name">${phaseName}</div>
                    <button class="phasebtn">
                        <svg class="col-more" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="18" cy="12" r="1.5" transform="rotate(90 18 12)" fill="currentColor"/><circle cx="12" cy="12" r="1.5" transform="rotate(90 12 12)" fill="currentColor"/><circle cx="6" cy="12" r="1.5" transform="rotate(90 6 12)" fill="currentColor"/></svg>
                    </button>
                </div>

                <div class="kanban-card-container"></div>

                <button class="new-task-button" id=${newTaskButtonId}>Add New Task</button>
            </div>`;
}

export default renderKanbanColumn;

/*
    CLASSES to use querySelector() for data modification

    - Phase Name:                   phase-name
    - More Options button:          phasebtn
    - Phase Cards Container:        kanban-card-container
    - New Task Button:              new-task-button

*/