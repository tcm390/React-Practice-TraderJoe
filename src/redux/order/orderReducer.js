const INITIAL_STATE = {
    currentOrder: 'Customer Review'
}


const orderReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_ORDER':
            return {
                ...state,
                currentOrder: action.payload
            };
        default:
            return state;
    }
}

export default orderReducer;