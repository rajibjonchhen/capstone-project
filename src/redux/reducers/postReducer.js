import { ACTIONS } from "../actions/action";
import { initialState } from "../store/store";

 const postReducer = ( state = initialState.post, action) => {
    switch (action.type){
        case ACTIONS.SET_SINGLE_POST: 
        return {
            ...state,
            singlePost : action.payload
        }

        case ACTIONS.SET_ALL_POSTS:
            return {
                ...state,
            allPosts : action.payload
            }

        default: return state
    }
}

export default  postReducer