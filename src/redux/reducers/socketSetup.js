


export default function socketSetup(socket) {
    // const navigate = useNavigate()
    socket.on("connection",()=>{console.log('connection established!')})
    socket.on("JWT_ERROR", () => console.log("JWT_ERROR"))
    socket.on("incoming-msg",(message) =>{
      // store.dispatch a NEW_MESSAGE action, the payload will be { chatId, message}

    })
    socket.on("disconnect", ()=>{})
}