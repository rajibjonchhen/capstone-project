import { Avatar, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentChatAction, setCurrentChatMessagesAction, setInitSocketAction } from '../redux/actions/action';
import "./chatBox.css";


function ChatBox() {

    const[sendMsgLoading, setSendMsgLoading] = useState(false)
    const[error, setError] = useState("")
    const [message , setMessage] = useState({
        text:""
    })
    
    const chatUser = useSelector(state => state.chat.chatUser)
    const currentChat = useSelector(state => state.chat.currentChat)
    const currentChatMessages = useSelector(state => state.chat.currentChatMessages)
    const myInfo = useSelector(state => state.user.myInfo)
    
    const dispatch = useDispatch()

    useEffect(() => {
        fetchChat()
        console.log("currentChatMessages myInfo and chatUser",currentChatMessages, myInfo, chatUser)
    },[chatUser])

    const fetchChat = async() => {
        // dispatch(setInitSocketAction(localStorage.getItem("MyToken")))

        try {
            console.log("fetching chat")
            const response  = await fetch(`${process.env.REACT_APP_PROD_BE_URL}/chats`, {
                method:"POST",
                body:JSON.stringify({recipient:chatUser?._id}),
                headers:{
                    "content-type":"application/json",
                    authorization: localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data =  await response.json()
                console.log("chat initiation error ", data.error)
                setError(data.error)
                setSendMsgLoading(false)
            } else {
                const data =  await response.json()
                console.log("chat initiated message", data.chat)
                dispatch(setCurrentChatAction(data.chat))
                dispatch(setCurrentChatMessagesAction(data.chat.messages))
                setSendMsgLoading(false)
            }
        } catch (error) {
            console.log("error fetching chat ", error )
            setSendMsgLoading(false)
        }
    }

    const handleTextChange = (e) => {
        console.log(message)
        setMessage({...message,text:e.target.value})
    }


    const sendMessage = async() => {
        setSendMsgLoading(true)
        try {
            console.log("fetching chat")
            const response  = await fetch(`${process.env.REACT_APP_PROD_BE_URL}/chats/${currentChat._id}`, {
                method:"POST",
                body:JSON.stringify({message}),
                headers:{
                    "content-type":"application/json",
                    authorization: localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data =  await response.json()
                console.log("chat initiation error ", data.error)
                setError(data.error)
                setSendMsgLoading(false)
            } else {
                const data =  await response.json()
                console.log("message", data)
                // dispatch(setCurrentChatAction(data.chat))
                // dispatch(setCurrentChatMessagesAction(data.chat.messages))
                setSendMsgLoading(false)
                setMessage({...message,text:""})
                fetchChat()
            }
        } catch (error) {
            console.log("error fetching chat ", error )
            setSendMsgLoading(false)
        }
    }

  return (

    <div  style={{ overflow:"hidden", border:"1px solid rgb(63,94,107)",height:"100%", display:"flex", justifyContent:"space-between", flexDirection:"column"}}>
        <div style={{ borderBottom:"1px solid rgb(53,85,99)", diplay:"flex", alignItems:'center', justifyContent:"space-between"}}>
                   
           
                <ListItem  className="pointer">
                    <ListItemAvatar>
                    <Avatar alt={chatUser?.name} src={chatUser?.avatar} />
                    </ListItemAvatar>
                    <Typography
                    style={{fontSize:"12px"}}
                    >
                        {`${chatUser?.name?.toUpperCase()} ${chatUser?.surname?.toUpperCase()}`}
                    </Typography>
                </ListItem>
            
        </div>
        
       
            <div style={{overflow:"scroll", alignSelf:"stretch", height:"65vh"}}>
                {error? <div>{error}</div> : currentChatMessages?.map((message) => 
                
                <div key={message._id} className={`p-2 w-100  ${message?.sender?._id === myInfo?._id?  "mr-auto":"ml-auto"}`}>
                    <div   className="d-flex p-2   align-items-baseline" style={{justifyContent : message?.sender?._id === myInfo?._id?"right":"left"}}>
                        <div style={{order:message?.sender?._id === myInfo?._id? "2":"1"}}>
                            <img src={message?.sender?.avatar} alt={message?.sender?.name} style={{width:"40px",height:"40px", borderRadius:"50%"}}/>
                        </div>
                        <div className='single-message' style={{order:message?.sender?._id !== myInfo?._id? "2":"1"}}>
                            <p style={{backgroundColor:"rgb(63,94,108)", padding:'15px', borderRadius:"10px"}}>
                                {message?.text}
                            </p>
                            <p style={{fontSize:'10px'}}>
                            <span className="m-1">
                                {new Date(message?.createdAt).toLocaleTimeString()}   
                            </span>
                            <span className="m-1">
                                {new Date(message?.createdAt).toLocaleDateString()} 
                            </span>
                        </p>
                        </div>
                    </div>
                </div>
                
                )  }
            </div>
        
        
        
            <div style={{display:"flex", padding:"10px", position:'relative'}}>
                <input value={message.text} onChange={(e) => handleTextChange(e)} 
                className="form-control"
                style={{
                  paddingLeft: "10px",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  textAlign: "left",
                  fontWeight: "normal",
                  width:"100%",
                  borderRadius:"30px",
              }}/>
                <Button className="theme-btn"
                style={{position:"absolute",right:"10px", height:"100%", borderRadius:"30px", height:'35px'}} 
                onClick={() => {
                    if(message.text.length > 0){
                        sendMessage()
                }}}>
                    {sendMsgLoading?  "loading...":"Send"}</Button>
            </div>
       
        
    </div>
    
  )
}

export default ChatBox