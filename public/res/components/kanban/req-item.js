export function renderCounterListItem(req) {
    // requirementName = chair t-20 c-10
    // requirementName = chair t-10 c-5
    //let elementId = requirementid ? taskCardId + '-req-' + requirementid : null;
    let reqDesc = null;
    

    return `
        <div class="req-item req-count-type">
            <div class="req-desc">
                <input type="text" class="req-desc-input" placeholder="Type here" ${req ? `value="${req.description}"` : ''}/>
            </div>
            <div class="req-options-container">
                <input type="number" placeholder="Target" min="0" class="input-target"  ${req ? `value="${req.target}"` : ''}/>
                <input type="number" placeholder="Current" min="0" class="input-current"  ${req ? `value="${req.current}"` : ''}/>
                <button class="delete-btn">
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21.32L21 3.32001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 3.32001L21 21.32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}

export function renderToggleListItem(taskCardId, position, req) {

    let checkBoxId = taskCardId + '-req-cb-' + position;
    let reqDesc = null;
    let reqState = null;

    if (req) {
        reqDesc = req.description;
        reqState = req.state;
    }

    console.log(reqDesc);

    return `
        <div class="req-item req-toggle-type">
            <div class="req-desc">
                <input type="text" class="req-desc-input" placeholder="Type here" ${reqDesc ? `value="${reqDesc}"` : ''}/>
            </div>
            
            <div class="req-options-container">
                <div class="checkbox-wrapper-10">
                    <input class="tgl tgl-flip checkbox-complete-state" id="${checkBoxId}" type="checkbox" ${reqState ? "checked" : "unchecked"} />
                    <label class="tgl-btn" data-tg-off="To do" data-tg-on="Done" for="${checkBoxId}"></label>
                </div>
                <button class="delete-btn">
                    <svg viewBox="-0.5 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 21.32L21 3.32001" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M3 3.32001L21 21.32" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
            </div>
        </div>
    `;
}