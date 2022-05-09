import { Avatar, ListItem, ListItemAvatar, Typography } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setCurrentChatAction, setCurrentChatMessagesAction } from '../redux/actions/action';
import "./chatBox.css"


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
        try {
            console.log("fetching chat")
            const response  = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/chats`, {
                method:"POST",
                body:JSON.stringify({recipient:chatUser}),
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
                console.log("chat initiated message", data.chat.messages)
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
            const response  = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/chats/${currentChat._id}`, {
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
            }
        } catch (error) {
            console.log("error fetching chat ", error )
            setSendMsgLoading(false)
        }
    }

  return (

    <Container  style={{display:"flex", flexDirection:"column", borderRadius:'5px',overflow:"hidden", boxShadow:"0 0 3px 3px rgb(224,224,224,0.3)"}}>
        <Row style={{ borderBottom:"1px solid rgb(224,224,224)"}}>
            <Col >
                <ListItem  className="pointer">
                    <ListItemAvatar>
                    <Avatar alt={chatUser.name} src={chatUser.avatar} />
                    </ListItemAvatar>
                    <Typography
                    style={{fontSize:"12px"}}
                    >
                        {`${chatUser.name} ${chatUser.surname}`}
                    </Typography>
                </ListItem>
            </Col>
        </Row>
        
        <Row>
            <Col style={{width:"100%",minHeight:"70vh", overflow:"scroll"}}>
                {error? <div>{error}</div> : currentChatMessages?.map((message,i ) => 
                <div key={i} className="p-2">
                    <p className="single-message">{message?.text}</p>
                    <p style={{fontSize:'10px'}}>
                        <span className="m-1">
                            {new Date(message?.createdAt).toLocaleTimeString()}   
                        </span>
                        <span className="m-1">
                            {new Date(message?.createdAt).toLocaleDateString()} 
                        </span>
                    </p>
                </div>)  }
            </Col>
        </Row>
        
        <Row>
            <Col style={{display:"flex",gap:"5px", marginBottom:"10px"}}>
                <input value={message.text} onChange={(e) => handleTextChange(e)} style={{width:"100%"}}/>
                <Button onClick={() => sendMessage()}>{sendMsgLoading?  "loading...":"Send"}</Button>
            </Col>
        </Row>
        
    </Container>
    
  )
}

export default ChatBox