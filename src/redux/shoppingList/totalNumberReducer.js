const INITIAL_STATE = {
    currentTotalNumber: 0
}


const totalNumberReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_TOTAL_NUMBER':
            return {
                ...state,
                currentTotalNumber: action.payload
            };
        default:
            return state;
    }
}

export default totalNumberReducer;