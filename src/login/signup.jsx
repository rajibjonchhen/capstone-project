

import * as React from 'react';
import {useState, useEffect} from 'react';
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
import { useDispatch } from 'react-redux';
import { setMyInfoAction } from '../redux/actions/action';
import { IconButton, InputAdornment } from '@material-ui/core';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Home from '../home/HomePage';
import OauthLogin from './OauthLogin';


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp({setShowSignIn}) {

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = useState("")
    const [showPassword, setShowPassword] = useState(true)
    const [isSubmit, setIsSubmit] = useState(false)
    const [signUpErr, setSignUpErr] = useState({})
    const [signUpUser, setSignUpUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    
    if(Object.keys(signUpErr).length === 0 && isSubmit){
        console.log("I am going to submit")
        registerUser()
    }
  },[signUpErr])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignUpUser({ ...signUpUser, [name]: value });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault()
    setSignUpErr(validateForm(signUpUser))
    setIsSubmit(true)
}

const validateForm = (signUpUser) => {
    const regex = /\S+@\S+\.\S+/
    const errors = {} 
    if(!signUpUser.email){
        errors.email = "email is missing"
    }else{
        if(!regex.test(signUpUser.email)){
            errors.email = "Email is not valid"
        }
    }
    if(!signUpUser.password){
        errors.password = "password is missing"
    }

    if(!signUpUser.name){

        errors.name =  "name is missing"
    }
    if(!signUpUser.surname ){
        errors.surname = "surname is missing"
    }
    
    return errors
}

const registerUser = async() => {
try {
    console.log(process.env.REACT_APP_DEV_BE_URL)
    console.log(signUpUser)
    const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/signUp`,{
        method:"POST",
        body : JSON.stringify(signUpUser),
        headers:{
            "content-type" :"application/json"
        }
    })
    if(response.status !== 200){
        const data = await response.json()
        console.log(data)
        setError(data.error)
    } else{
        const data = await response.json()
        console.log(data)
        localStorage.setItem("MyToken", data.token);
        dispatch(setMyInfoAction(data.user))
        navigate("/home")
    }
} catch (error) {
    console.log(error)
}
}

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" className='theme-light-bg mt-3 py-3'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
           
        
          <Box sx={{ display: 'flex', alignItems: 'left', width: '100%'  }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%', padding:'30px 15px', border:'1px solid rgb(200,200,200)'  }}>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          {error.length > 0 && <Alert fullWidth severity="error">{error}</Alert>}
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="name"
            label="First Name"
            name="name"
            autoFocus
            value={signUpUser.name}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{!signUpUser.name && signUpErr.name}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="surname"
            label="Last Name"
            name="surname"
            autoFocus
            value={signUpUser.surname}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{!signUpUser.surname && signUpErr.surname}</Typography>
            
            <TextField
             margin="normal"
             required
             fullWidth
             size="small"
             id="email"
             label="Email Address"
             name="email"
             autoComplete="outlined-error"
             autoFocus
            value={signUpUser.email}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{!signUpUser.email && signUpErr.email}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            name="password"
            label="Password"
            type= {showPassword? "text":"password"}
            id="password"
            value={signUpUser.password}
            onChange={(e) => handleChange(e)}
            endAdornment={<IconButton> <VisibilityOff /> </IconButton>}
            />
            <Typography color="secondary"  align='left'>{!signUpUser.password && signUpErr.password}</Typography>
            
        <Button
              fullWidth
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
            >
                Register
            </Button>
            <Grid container>
              
                <Typography  onClick={() => setShowSignIn(true)} variant="body2">
                  Already a member? <span className="text-blue">Sign In</span>
                </Typography>
              
            </Grid>
            <Avatar sx={{ m: "10px auto", bgcolor: 'secondary.main' }}>
            Or
          </Avatar>
          <Box sx={{ mt: 2, width: '100%', p:1}}>
              <Typography> Continue with</Typography>
             <OauthLogin/>
         
          </Box>
        </Box>
        </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}