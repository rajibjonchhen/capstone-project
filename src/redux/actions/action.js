export const ACTIONS = {
    SET_MY_INFO : "SET_USER",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_MY_MESSAGE : "SET_MY_MESSAGE",
    SET_SINGLE_PRODUCT : "SET_SINGLE_PRODUCT",
    SET_ALL_PRODUCTS : "SET_ALL_PRODUCTS",
    SET_MY_PRODUCTS : "SET_MY_PRODUCTS",
    SET_SINGLE_POST : " SET_SINGLE_POST",
    SET_ALL_POSTS : "SET_ALL_POSTS",
    SET_SELECTED_CATEGORY : "SET_SELECTED_CATEGORY"
    
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

export const setAllProductsAction = (products) => ({
    type : ACTIONS.SET_ALL_PRODUCTS,
    payload : products
})

export const setMyProductsAction = (products) => ({
    type : ACTIONS.SET_MY_PRODUCTS,
    payload : products
})

export const setSinglePostAction = (post) => ({
    type : ACTIONS.SET_SINGLE_POST,
    payload : post
})

export const setAllPostsAction = (posts) => ({
    type : ACTIONS.SET_ALL_POSTS,
    payload : posts
})

export const setSelectedCategoryAction = (category) => ({
    type : ACTIONS.SET_ALL_POSTS,
    payload : category
})
