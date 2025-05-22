// Must pass Kanban-col id
export function getPhaseIndexId(taskCardId) {
    let splitId = taskCardId.split("-")
    const phaseIndexId = splitId[1]

    return phaseIndexId;
}

export function getTaskId(taskCardId) {
    let splitId = taskCardId.split("-")
    const taskIndexId = splitId[3]

    return taskIndexId;
}

export function getTaskObject(phases, taskCardId) {
    let splitId = taskCardId.split("-")
    const phaseIndexId = splitId[1]
    const taskIndexId = splitId[3]

    return phases.find(phase => phase.indexId == phaseIndexId).tasks.find(task => task.id == taskIndexId);
}