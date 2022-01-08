const INITIAL_STATE = {
    currentSelectedProduct: null
}


const selectedProductReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_SELECTED_PRODUCT':
            return {
                ...state,
                currentSelectedProduct: action.payload
            };
        default:
            return state;
    }
}

export default selectedProductReducer;