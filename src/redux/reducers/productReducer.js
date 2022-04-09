import { ACTIONS } from "../actions/action";
import { initialState } from "../store/store";

 const productReducer = ( state = initialState.product, action) => {
    switch (action.type){

        case ACTIONS.SET_SINGLE_PRODUCT: 
        return {
            ...state,
            singleProduct : action.payload
        }

        case ACTIONS.SET_ALL_PRODUCTS:
            return {
                ...state,
            allProducts : action.payload
            }
        default: return state
    }
}

export default  productReducer