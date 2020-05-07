import * as actionTypes from '../actions/actionTypes';
import { generateProducts } from '../../components/product-listing/products-helpers';


const initialCartState = generateProducts(3);


const shoppingCartReducer = (state = initialCartState, action) => {
    
    switch(action.type) {
        case actionTypes.ADD_TO_CART:
            return [...state, action.payload];
        case actionTypes.REMOVE_FROM_CART:
            return [...action.payload];
        case actionTypes.APPLY_COUPON:
            return [...action.payload.newProducts];
        case actionTypes.CLEAR_CART:
            return [];
        default:
            return state;
    }
}

export default shoppingCartReducer;

