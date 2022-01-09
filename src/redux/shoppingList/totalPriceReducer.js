const INITIAL_STATE = {
    currentTotalPrice: 0
}


const totalPriceReducer = (state = INITIAL_STATE, action) => {

    switch (action.type) {
        case 'SET_CURRENT_TOTAL_PRICE':
            return {
                ...state,
                currentTotalPrice: action.payload
            };
        default:
            return state;
    }
}

export default totalPriceReducer;