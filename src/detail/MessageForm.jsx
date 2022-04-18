import { TextField, Typography } from "@material-ui/core";
import { Button } from "@mui/material";
import { useState, useEffect } from "react";
import {Alert} from "@mui/material"
import { useSelector } from "react-redux";

function MessageForm() {

    const myInfo = useSelector(state => state.user.myInfo ) 
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [isSubmit, setIsSubmit] = useState(false)
    const singleProduct = useSelector(state => state.product.singleProduct ) 
    const [messageErr, setMessageErr] = useState({})
    const [message, setMessage] = useState({
        text:"",
        title:"",
        place:"",
        product:"",
        receiver : ""

    })

    useEffect(() => {
        console.log("single product creator",  singleProduct.creator)
        setMessage({...message, product: singleProduct._id,receiver:singleProduct.creator})
    },[])

    useEffect(() => {
        if(Object.keys(messageErr).length === 0 && isSubmit){
            submitMessage()
        }
    },[messageErr])

    const handleChange = (e) => {
        const {name, value} = e.target
        setMessage({...message, [name]:value})
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
        <div style={{borderTop:"1px solid rgba(128, 128, 128, 0.493)"}}>
            <h1>Write your message</h1>
           <Alert variant="danger" style={{opacity: error? 1:0}}>{error}</Alert>
        <TextField
            margin="normal"
            required
            fullWidth
            size="small"
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
            rows={2}
            maxRows={4}
            size="small"
            id="name"
            label="text"
            name="text"
            value={message.text}
            autoFocus
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{ messageErr?.text && messageErr?.text} </Typography>
        <TextField
            margin="normal"
            fullWidth
            size="small"
            id="name"
            label="place"
            name="place"
            autoFocusx
            onChange={(e) => handleChange(e)}
            />
            <Button onClick={(e) => handleSubmit(e)}>Send</Button>
        </div>
     );
}

export default MessageForm;