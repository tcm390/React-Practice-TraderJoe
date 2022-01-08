const INITIAL_STATE = {
    currentTerm: ''
}


const termReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_TERM':
            return {
                ...state,
                currentTerm: action.payload
            };
        default:
            return state;
    }
}

export default termReducer;