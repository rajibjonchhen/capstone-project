import { ACTIONS } from "../actions/action";
import { initialState } from "../store/store";

 const productReducer = ( state = initialState.product, action) => {
    switch (action.type){
        case ACTIONS.SET_SINGLE_PRODUCT: 
        return {
            ...state,
            myInfo : action.payload
        }

        default: return state
    }
}

export default  productReducer