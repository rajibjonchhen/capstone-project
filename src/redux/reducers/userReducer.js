import { ACTIONS } from "../actions/action";
import { initialState } from "../store/store";

 const userReducer = ( state = initialState.user, action) => {
    switch (action.type){
        case ACTIONS.SET_MY_INFO: 
        return {
            ...state,
            myInfo : action.payload
        }

        default: return state
    }
}

export default  userReducer