import {createStore, combineReducers, compose, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import userReducer from '../reducers/userReducer'

const windowCompose = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const initialState = {
user : {
    myInfo : {}
}
}

const multiReducer = combineReducers({
   user : userReducer
})

let configureStore = createStore(
    multiReducer,
    initialState,
    windowCompose(applyMiddleware(thunk))
)

export default configureStore