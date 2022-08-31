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


            case ACTIONS.INIT_SOCKET:
      const ADDRESS = "http://localhost:3001";
      const socket = io(ADDRESS, {
        transports: ["websocket"],
        auth: { token: action.payload },
      });

      //     // initialize your socket listeners.....
      socketSetup(socket);
      return { ...state, socket };
    case "EMIT_TEST":
      state.socket?.emit("testEvent", { message: "Hello world" });
      return state;

    case ACTIONS.SEND_MESSAGE:
      // update the correct chat with the new message
      // look for the chat which has chatId as _id
      state.socket?.emit("outgoing-msg", action.payload);
      return {
        ...state,
        chats: state.chats
          .filter((chat) => chat._id === action.payload.chatId)
          .message.concat(action.payload.message),
      };

       default:
           return state
    }
}

export default chatReducer
