import { combineReducers } from 'redux';

import userReducer from './user/userReducer';
import categoryReducer from './category/categoryReducer';
import orderReducer from './order/orderReducer';
import mainCategoryReducer from './category/mainCategoryReducer';
import termReducer from './searchTerm/termReducer';
import searchButtonReducer from './searchButton/searchButtonReducer';
import commentReducer from './comment/commentReducer';
import starReducer from './star/starReducer';
import selectedProductReducer from './choosingProduct/selectedProductReducer';
import totalPriceReducer from './shoppingList/totalPriceReducer'

export default combineReducers({
    user: userReducer,
    category: categoryReducer,
    mainCategory: mainCategoryReducer,
    order: orderReducer,
    term: termReducer,
    searchButton: searchButtonReducer,
    comment: commentReducer,
    star: starReducer,
    selectedProduct: selectedProductReducer,
    totalPrice: totalPriceReducer
})