

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setMyInfoAction } from '../redux/actions/action';
import { Image } from 'react-bootstrap';
import getMyInfo from '../getMyInfo';



const theme = createTheme();

export default function PostForm({handleClose}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = React.useState("")
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [postErr, setPostErr] = React.useState({})
    const [isLoading, setIsloading] = React.useState(false)
    const [newPost, setNewPost] = React.useState({
    content: "",
  });

  const [myInfo, setMyInfo] = React.useState({})
    

  const gettingMyInfo = async() =>{
    setMyInfo(await getMyInfo())
    console.log(await getMyInfo())
}


  // const myInfo = useSelector(state => state.user.myInfo)

  React.useEffect(() => {
    gettingMyInfo()
    if(Object.keys(postErr).length === 0 && isSubmit){
        console.log("I am going to submit")
        uploadPost()
    }
  },[postErr])
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setPostErr(validateForm(newPost))
    setIsSubmit(true)
   
}

const validateForm = (signInUser) => {
    const errors = {} 
    if(newPost.content.length <1){
        errors.content = "Post is empty"
    }
    
    return errors
}

const uploadPost = async() => {
try {
    console.log(process.env.REACT_APP_DEV_BE_URL)
    console.log(newPost)
    const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/posts`,{
        method:"POST",
        body : JSON.stringify(newPost),
        headers:{
            "content-type" :"application/json",
            "authorization": localStorage.getItem("MyToken")
        }
    })
    if(response.status !== 200){
        const data = await response.json()
        console.log(data)
        setError(data.error)
        setIsloading(false)
      } else{
        const data = await response.json()
        console.log(data)
        setIsloading(false)
        
      }
    } catch (error) {
      console.log(error)
      setIsloading(false)
}
}

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            display: 'flex'
          }}
        >
           <Box>

           <Avatar src={myInfo?.avatar || `https://ui-avatars.com/api/?name=${myInfo?.name}+${myInfo?.surname}`} className="userImg"/>
           <Typography>
            {`${myInfo?.name} ${myInfo?.surname}`}
           </Typography>
           </Box>
        
          {error.length > 0 && <Alert fullWidth severity="error">{error}</Alert>}
          <Box sx={{ display: 'flex', alignItems: 'left', width: '100%'  }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            
            <TextField
            margin="normal"
            fullWidth
            size="small"
            name="content"
            label="Write you post"
            type="text"
            id="content"
            minRows={4}
            maxRows={4}
            
            value={newPost.content}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary"  align='left'>{postErr.password}</Typography>
           
          </Box>
       
        </Box>
      
        <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
                Post
            </Button>
        </Box>
        </Container>
    </ThemeProvider>
  )
}
