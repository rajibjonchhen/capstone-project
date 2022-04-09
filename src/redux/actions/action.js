export const ACTIONS = {
    SET_MY_INFO : "SET_USER",
    SET_SINGLE_PRODUCT : "SET_SINGLE_PRODUCT"
}

export const setMyInfoAction = (user) => ({
    type : ACTIONS.SET_MY_INFO,
    payload : user
})

export const setSingleProductAction = (product) => ({
    type : ACTIONS.SET_SINGLE_PRODUCT,
    payload : product
})