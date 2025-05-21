function renderCounterListItem(requirementid, requirementName, target, current) {
    // requirementName = chair t-20 c-10
    // requirementName = chair t-10 c-5

    
    return `
        <div class="req-count-type" id="${requirementid}">
            <div class="req-desc">
                <input type="text" class="req-desc-input" placeholder="Type here" value=${requirementName}/>
            </div>
            <div class="req-options-container">
                <input type="number" placeholder="Target" class="input-target" value=${target}/>
                <input type="number" placeholder="Current" class="input-current" value=${current}/>
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

/*
    CLASSES to use querySelector() for data modification

    - Requirement Description:          req-desc-input
    - Target input:                     input-target
    - Current input:                    input-current
    - Delete button:                    delete-btn

*/

export default renderCounterListItem;