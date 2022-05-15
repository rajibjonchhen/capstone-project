import {ACTIONS} from "../actions/action.js"
import { initialState } from "../store/store.js"

const chatReducer = (state = initialState.chat, action) => {
    switch(action.type){
        case ACTIONS.SET_CHAT_USER:
            return{
                ...state,
                chatUser : action.payload
            }

        case ACTIONS.SET_CURRENT_CHAT:
            return{
                ...state,
                currentChat : action.payload
            }

        case ACTIONS.SET_CURRENT_CHAT_MESSAGES:
            return{
                ...state,
                currentChatMessages : action.payload
            }
        
        case ACTIONS.SET_ALL_CHATS:
            return{
                ...state,
                allChats : action.payload
            }
        
        case ACTIONS.SET_UNREAD_MESSAGES:
            return{
                ...state,
                unreadMessages : action.payload
            }

       default:
           return state
    }
}

export default chatReducer
