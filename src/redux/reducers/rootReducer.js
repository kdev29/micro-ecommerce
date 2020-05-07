import {combineReducers} from 'redux';
import shoppingCartReducer from './shoppingCartReducers';
import couponsReducer from './couponsReducers';

const rootReducer = combineReducers({
    shoppingCart: shoppingCartReducer,
    appliedCoupons: couponsReducer
});

export default rootReducer;