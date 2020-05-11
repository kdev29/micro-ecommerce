//import actions
import * as actions from '../actions/actionTypes';
//set initialState
const initialState = [];
//switch

//export a function which receives state, and payload
export default function productsReducer(state = initialState, action){    
    switch(action.type){ 
        case actions.LOAD_PRODUCTS:
            return [...action.payload];            
        default:
            return initialState;
    }
    
} 
