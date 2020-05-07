import * as actionTypes from '../actions/actionTypes';

const appliedCoupons = [];

const couponsReducer = (state = appliedCoupons, action) => {

    
    switch(action.type) {
        case actionTypes.APPLY_COUPON:
            return [...action.payload.coupons];
        default:
            return state;
    }
}

export default couponsReducer;