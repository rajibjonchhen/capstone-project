import { Container, Grid } from "@material-ui/core";
import { ListItem } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setMyMessagesAction } from "../redux/actions/action";
import "./myMessage.css"
function MyMessages() {

    const [error, setError] = useState()
    const [singleMsg, setSingleMsg] = useState({})
    const [isLoading, setIsLoading] = useState()
    
    
    const myMessages = useSelector(state => state.user.myMessages)
    const dispatch = useDispatch()

    

    const getMessages = async() =>{
        try{
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me/messages`,{
                method:"GET",
                headers:{
                    "authorization": localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
              } else{
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
                dispatch(setMyMessagesAction(data.messages))
              }
            } catch (error) {
              console.log(error)
            setIsLoading(false)
        }
    }


    useState(() => {
        getMessages()
    },[])


    return (  

       

            <Grid container>
                <Grid item xs={12} md={6} lg={4} className="msg-list">
                    <ul>
                        {myMessages.map(message => <li onClick={() => {setSingleMsg(message)}}>{message.product}</li>)}
                    </ul>
                </Grid>
                <Grid xs={12} md={6} lg={8} item className="msg-detail-box">
                    <h3>Message Detail</h3>
                    {singleMsg && <div style={{textAlign:"left", margin:"0 0 0 10px"}}>
                                <p className="message-element-title">Sender :</p>
                                <p className="message-element">{singleMsg.sender}</p>
                                <p className="message-element-title">Text :</p>
                                <p className="message-element">{singleMsg.text}</p>
                                <p className="message-element-title">Place :</p>
                                <p className="message-element">{singleMsg.place}</p>
                            </div>
                    }
                    <div>
                        
                    </div>
                </Grid>
            </Grid>
            
       
    );
}

export default MyMessages;