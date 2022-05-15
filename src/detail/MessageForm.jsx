import { Box, TextField, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import {Alert} from "@mui/material"
import { useSelector } from "react-redux";
import "./messageForm.css"
import { Close } from "@mui/icons-material";
import Meeting from "./Meeting";


function MessageForm({setOpen}) {

    const myInfo = useSelector(state => state.user.myInfo ) 
    const singleProduct = useSelector(state => state.product.singleProduct ) 
    const [bookAMeeting, setBookAMeeting] = useState(false)
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const [messageErr, setMessageErr] = useState({})
    const [message, setMessage] = useState({
        text:"",
        title:"",
        place:"",
        product:"",
        receiver : "",
        meetingDate: ""

    })

    useEffect(() => {
        console.log("single product creator",  singleProduct.creator)
        setMessage({message,recepient:singleProduct.creator})
    },[])

    useEffect(() => {
        if(Object.keys(messageErr).length === 0 && isSubmit){
            submitMessage()
        }
    },[messageErr])

    const handleChange = (e) => {
        const {name, value} = e.target
        setMessage({...message, [name]:value})
        console.log(message)
    }

    const verifyMessage = () => {
        
        const error = {}
        if(!message.text){
            error.text = "message is missing" 
        } else{
            if(message.text.length < 10){
                error.text = "message must be longer than 10 characters"
            }

        }
        if(!message.title){
            error.title = "title must be provided"
        }
       return error
    }

    const handleSubmit = () => {
        console.log(message)
        setMessageErr(verifyMessage(messageErr))
        setIsSubmit(true)
    }

    const submitMessage = async() => {
        console.log("trying to submit")
        try {
            const response = await fetch(
                `${process.env.REACT_APP_DEV_BE_URL}/users/me/messages`,
                {
                method: "POST",
                body :JSON.stringify(message),
                headers: {
                    "content-type":"application/json",
                    authorization: localStorage.getItem("MyToken"),
                },
                }
            );
            if (response.status !== 200) {
                const data = await response.json();
                console.log(data);
                setError(data.error)
                setTimeout(() => setError(""),2000)
                ;
                setIsLoading(false);
            } else {
                const data = await response.json();
                console.log(data);
                setIsLoading(false);
            }
            } catch (error) {
            console.log(error);
            setIsLoading(false);
            setError(error)
            setTimeout(() => setError(""),2000)

            }
    }



    return ( 
        <div className="message-box bg-white">
            <Close onClick={() => setOpen(false)} className="pointer text-dark"/>
            <h1 className="text-dark">Write your message</h1>
           <Alert variant="danger" style={{opacity: error? 1:0}}>{error}</Alert>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    
                    id="name"
                    label="title"
                    name="title"
                    value={message.title}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />
                    <Typography color="secondary" align='left'>{!message.title && messageErr?.title}</Typography>
                <TextField
                    margin="normal"
                    required
                    fullWidth
                    variant="outlined"
                    minRows={2}
                    maxRows={4}
                   
                    id="name"
                    label="text"
                    name="text"
                    value={message.text}
                    autoFocus
                    onChange={(e) => handleChange(e)}
                    />
                    <Typography color="secondary" align='left'>{ messageErr?.text && messageErr?.text} </Typography>
                    {!bookAMeeting ? <Button className="theme-btn" style={{display:bookAMeeting? "none":"block"}} onClick={() => setBookAMeeting(true)}>Book a meeting</Button> 
                        :<Box style={{display:"flex", alignItems:'baseline', justifyContent:"space-between"}}>
                    <TextField
                        margin="normal"
                        variant="outlined"
                        id="name"
                        label="Meeting Place"
                        name="place"
                        autoFocus
                        onChange={(e) => handleChange(e)}
                        style={{marginRight:"15px", width:"70%"}}
                        />
 
                     <Meeting message={message} setMessage={setMessage}/><Close className="text-dark" onClick={() => {setBookAMeeting(false);setMessage({...message, meetingDate:"",place:""})}}/>
                    </Box> }
                    <Button variant="contained" className="theme-btn" onClick={(e) => handleSubmit(e)}>Send</Button>
        </div>
     );
}

export default MessageForm;