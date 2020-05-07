import * as actionTypes from './actionTypes';

//this action will be called from a connected component
export function addItemToCart(item) {
    return function(dispatch) {
        dispatch({
            type: actionTypes.ADD_TO_CART,
            payload: item
        });
    }
}

export function removeItemFromCart(item, sstate) {
    return function(dispatch, state) {
        

        const {shoppingCart} = state();

        const newArray = [...shoppingCart];
        const deleteIndex = newArray.findIndex(i => {
            return i.name == item.name;
        })
        newArray.splice(deleteIndex, 1)


        dispatch({
            type: actionTypes.REMOVE_FROM_CART,
            payload: newArray
        })
    }
}

export function applyCoupon(coupon) {
    return function(dispatch, state) {
        const {shoppingCart} = state();

        const { value } = coupon;
        const {appliedCoupons} = state();
        


        const newProducts = shoppingCart.map(p => {
            return {...p, finalPrice: p.finalPrice * value}
        })

        // newProducts.forEach(p => {
        //     p.finalPrice = p.finalPrice * value;
        // })

        dispatch({
            type: actionTypes.APPLY_COUPON,
            payload: {newProducts, coupons: [...appliedCoupons, coupon]}
        });
    }
}

export function clearShoppingCart(){
    return function(dispatch) {
        dispatch({
            type: actionTypes.CLEAR_CART,
            payload: []
        })
    }
}

// function addItemToCartSuccess(item) {
//     return {
//         type: actionTypes.ADD_TO_CART,
//         payload: item
//     }
// }