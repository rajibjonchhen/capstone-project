export const ACTIONS = {
    SET_MY_INFO : "SET_USER",
    SET_ALL_USERS : "SET_ALL_USERS",
    SET_ROLE :"SET_ROLE",
    
    SET_MY_MESSAGES : "SET_MY_MESSAGES",
    SET_PROFILE_PAGINATION : "SET_PROFILE_PAGINATION",
    SET_UNREAD_MESSAGES : "SET_UNREAD_MESSAGES",
    SEND_MESSAGE : "SEND_MESSAGE",
    INIT_SOCKET:"INIT_SOCKET",
    
    SET_CHAT_USER : "SET_CHAT_USER",
    SET_ALL_CHATS : "SET_ALL_CHATS",
    SET_CURRENT_CHAT :"SET_CURRENT_CHAT",
    SET_CURRENT_CHAT_MESSAGES :"SET_CURRENT_CHAT_MESSAGES",

    SET_SINGLE_PRODUCT : "SET_SINGLE_PRODUCT",
    SET_ALL_PRODUCTS : "SET_ALL_PRODUCTS",
    SET_MY_PRODUCTS : "SET_MY_PRODUCTS",
    SET_SELECTED_CATEGORY : "SET_SELECTED_CATEGORY",
    SET_PRODUCTS_LIKED : "SET_PRODUCTS_LIKED",

    SET_SINGLE_POST : " SET_SINGLE_POST",
    SET_ALL_POSTS : "SET_ALL_POSTS",
}


//******************* user action *******************
export const setMyInfoAction = (user) => ({
    type : ACTIONS.SET_MY_INFO,
    payload : user
})


export const setAllUsersAction = (users) => ({
    type : ACTIONS.SET_ALL_USERS,
    payload : users
})


export const setRoleAction = (role) => ({
    type : ACTIONS.SET_ROLE,
    payload : role
})


//***************** message actions *****************
export const setMyMessagesAction = (messages) => ({
    type : ACTIONS.SET_MY_MESSAGES,
    payload : messages
})

export const setAllChatsAction = (chats) => ({
    type : ACTIONS.SET_ALL_CHATS,
    payload : chats
})

export const setProfilePaginationAction = (selected) => ({
    type : ACTIONS.SET_PROFILE_PAGINATION,
    payload : selected
})

export const setUnreadMessageAction = (messages) => ({
    type : ACTIONS.SET_UNREAD_MESSAGES,
    payload : messages
})


//***************** product actions *****************
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

export const setProductsLikedAction = (products) => ({
    type : ACTIONS.SET_PRODUCTS_LIKED,
    payload : products
})

//********************** Post action **********************
export const setSinglePostAction = (post) => ({
    type : ACTIONS.SET_SINGLE_POST,
    payload : post
})

export const setAllPostsAction = (posts) => ({
    type : ACTIONS.SET_ALL_POSTS,
    payload : posts
})

export const setSelectedCategoryAction = (category) => ({
    type : ACTIONS.SET_SELECTED_CATEGORY,
    payload : category
})


//*********************** chat actions ***********************
export const setChatUserAction = (user) => ({
    type : ACTIONS.SET_CHAT_USER,
    payload : user
})

export const setCurrentChatAction = (chat) => ({
    type : ACTIONS.SET_CURRENT_CHAT,
    payload : chat
})

export const setCurrentChatMessagesAction = (messages) => ({
    type : ACTIONS.SET_CURRENT_CHAT_MESSAGES,
    payload : messages
})

export const setInitSocketAction = (accessToken) => ({
    type: ACTIONS.INIT_SOCKET,
    payload: accessToken,
  });
  
  export const sendMessageAction = (sendMessage) => ({
    type: ACTIONS.SEND_MESSAGE,
    payload: sendMessage,
  });
