export const ACTIONS = {
    SET_MY_INFO : "SET_USER",
    SET_SINGLE_PRODUCT : "SET_SINGLE_PRODUCT",
    SET_ALL_PRODUCTS : "SET_ALL_PRODUCTS",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_ALL_POSTS : "SET_ALL_POSTS",
    SET_SINGLE_POST : " SET_SINGLE_POST"
    
}

export const setMyInfoAction = (user) => ({
    type : ACTIONS.SET_MY_INFO,
    payload : user
})

export const setAllUsersAction = (users) => ({
    type : ACTIONS.SET_ALL_USERS,
    payload : users
})

export const setSingleProductAction = (product) => ({
    type : ACTIONS.SET_SINGLE_PRODUCT,
    payload : product
})

export const setAllProductsAction = (product) => ({
    type : ACTIONS.SET_ALL_PRODUCTS,
    payload : product
})

export const setSinglePostAction = (product) => ({
    type : ACTIONS.SET_SINGLE_POST,
    payload : product
})

export const setAllPostsAction = (product) => ({
    type : ACTIONS.SET_ALL_POSTS,
    payload : product
})
