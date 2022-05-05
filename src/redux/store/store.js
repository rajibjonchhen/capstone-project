import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
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
    chatUser : {}
},
product : {
    allProducts:[],
    singleProduct : {},
    selectedCategory : "",
    myProducts : []
},
post : {
    allPosts:[],
    singlePost : {}
}
}

const multiReducer = combineReducers({
   user : userReducer,
   product : productReducer,
   post : postReducer
})

let configureStore = createStore(
    multiReducer,
    initialState,
    windowCompose(applyMiddleware(thunk))
)

export default configureStore