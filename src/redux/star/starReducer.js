const INITIAL_STATE = {
    currentStar: 0
}


const starReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_STAR':
            return {
                ...state,
                currentStar: action.payload
            };
        default:
            return state;
    }
}

export default starReducer;