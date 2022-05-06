import {ACTIONS} from "../actions/action.js"
import { initialState } from "../store/store.js"

const chatReducer = (state = initialState.chat, action) => {
    switch(action.type){
        case ACTIONS.SET_CHAT_USER:
            return{
                ...state,
                chatUser : action.payload
            }
       default:
           return state
    }
}

export default chatReducer
