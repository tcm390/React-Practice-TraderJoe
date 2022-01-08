const INITIAL_STATE = {
    currentMainCategory: 'All'
}


const mainCategoryReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_MAIN_CATEGORY':
            return {
                ...state,
                currentMainCategory: action.payload
            };
        default:
            return state;
    }
}

export default mainCategoryReducer;