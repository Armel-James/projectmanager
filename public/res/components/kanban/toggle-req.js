function renderToggleListItem(requirementid, requirementName ) {

    return `
        <div class="req-toggle-type" id=${requirementid}>
            <div class="req-desc">
                <input type="text" class="req-desc-input" placeholder="Type here"/>
            </div>
            
            <div class="req-options-container">
                <div class="checkbox-wrapper-10">
                    <input class="tgl tgl-flip checkbox-complete-state" id="${requirementName}" type="checkbox" unchecked />
                    <label class="tgl-btn" data-tg-off="To do" data-tg-on="Done" for="${requirementName}"></label>
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

/*
    Classes to use querySelector() for data modification

    - Requirement Description:          req-desc-input
    - Toggle Button:                    checkbox-complete-state
    - Delete button:                    delete-btn

*/

export default renderToggleListItem;