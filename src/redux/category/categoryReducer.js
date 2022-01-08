const INITIAL_STATE = {
    currentCategory: 'All'
}


const categoryReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_CATEGORY':
            return {
                ...state,
                currentCategory: action.payload
            };
        default:
            return state;
    }
}

export default categoryReducer;