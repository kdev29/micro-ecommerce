import {combineReducers} from 'redux';
import shoppingCartReducer from './shoppingCartReducers';
import couponsReducer from './couponsReducers';
import productsReducer from './productsReducer';

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    appliedCoupons: couponsReducer,
    products: productsReducer
});

export default rootReducer;