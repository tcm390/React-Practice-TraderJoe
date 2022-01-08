const INITIAL_STATE = {
    currentSearchButton: false
}


const searchButtonReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_SEARCH_BUTTON':
            return {
                ...state,
                currentSearchButton: action.payload
            };
        default:
            return state;
    }
}

export default searchButtonReducer;