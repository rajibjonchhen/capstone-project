export const ACTIONS = {
    SET_MY_INFO : "SET_USER"
}

export const setMyInfoAction = (user) => ({
    type : ACTIONS.SET_MY_INFO,
    payload : user
})