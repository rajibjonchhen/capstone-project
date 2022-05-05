import { ACTIONS } from "../actions/action";
import { initialState } from "../store/store";

 const userReducer = ( state = initialState.user, action) => {
    switch (action.type){
        case ACTIONS.SET_MY_INFO: 
        return {
            ...state,
            myInfo : action.payload
        }

        case ACTIONS.SET_ALL_USERS:
            return {
                ...state,
            allUsers : action.payload
            }

        case ACTIONS.SET_CHAT_USER:
            return{
                ...state,
                chatUser : action.payload
            }

        case ACTIONS.SET_MY_MESSAGES:
            return {
                ...state,
            myMessages : action.payload
            }

        case ACTIONS.SET_PROFILE_PAGINATION:
            return {
                ...state,
                profilePagination : action.payload
            }

        default: return state
    }
}

export default  userReducer