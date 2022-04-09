import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import productReducer from '../reducers/productReducer.js'
import userReducer from '../reducers/userReducer.js'

const windowCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
user : {
    myInfo : {}
},
product : {
    singleProduct : {}
}
}

const multiReducer = combineReducers({
   user : userReducer,
   product : productReducer,
})

let configureStore = createStore(
    multiReducer,
    initialState,
    windowCompose(applyMiddleware(thunk))
)

export default configureStore