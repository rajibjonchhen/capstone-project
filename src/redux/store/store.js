import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import chatReducer from '../reducers/chatReducer.js'
import postReducer from '../reducers/postReducer.js'
import productReducer from '../reducers/productReducer.js'
import userReducer from '../reducers/userReducer.js'

const windowCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
user : {
    allUsers:[],
    myInfo : {},
    myMessages : [],
    profilePagination :"",
    role:""
    
},
product : {
    allProducts:[],
    singleProduct : {},
    selectedCategory : "all",
    myProducts : []
},
post : {
    allPosts:[],
    singlePost : {}
},
chat : {
    chatUser : {},
    currentChat: {},
    currentChatMessages : [],
    unreadMessages :[]
}
}

const multiReducer = combineReducers({
   user : userReducer,
   product : productReducer,
   post : postReducer,
   chat : chatReducer
})

let configureStore = createStore(
    multiReducer,
    initialState,
    windowCompose(applyMiddleware(thunk))
)

export default configureStore