const INITIAL_STATE = {
    currentComment: false
}


const commentReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_COMMENT':
            return {
                ...state,
                currentComment: action.payload
            };
        default:
            return state;
    }
}

export default commentReducer;