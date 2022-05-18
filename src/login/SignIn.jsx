

import { Alert } from '@mui/material';
import { useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { setMyInfoAction } from '../redux/actions/action';
import OauthLogin from './OauthLogin';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        www.creatorsspace.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const theme = createTheme();

export default function SignIn({setShowSignIn}) {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [error, setError] = React.useState("")
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [signInErr, setSignInErr] = React.useState({})
    const [signInUser, setSignInUser] = React.useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

React.useEffect(() => {
    if(Object.keys(signInErr).length === 0 && isSubmit){
        console.log("I am going to submit")
        loginUser()
    }
},[signInErr])

const handleChange = (e) => {
    setError("")
    const {name, value} = e.target
    setSignInUser({...signInUser, [name]:value})
    console.log(signInUser.email)
} 

const handleSubmit = (e) => {
    e.preventDefault()
    setSignInErr(validateForm(signInUser))
    setIsSubmit(true)
}

const validateForm = (signInUser) => {
    const regex = /\S+@\S+\.\S+/
    const errors = {} 
    if(!signInUser.email){
        errors.email =  "email is missing"
    }else{
        if(!regex.test(signInUser.email)){
            errors.email = "Email is not valid"
        }
    }
    if(!signInUser.password){
        errors.password =  "password is missing"
    }
   
    return errors
}

const loginUser = async()=> {
    try {
        console.log(process.env.REACT_APP_DEV_BE_URL)
        console.log(signInUser)
        const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/signIn`,{
            method:"POST",
            body : JSON.stringify(signInUser),
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
      <Container maxWidth="xs"  className='theme-light-bg mt-3 py-3 text-dark'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%',padding:'30px 15px', border:'1px solid rgb(200,200,200)'  }}>
       
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         {error.length > 0 && <Alert margin="normal" fullWidth severity="error">{error}</Alert>}
            <TextField
            
            margin="normal"
            required
            fullWidth
            size="small"
            id="email"
            label="Email Address"
            name="email"
            autoFocus
            value={signInUser.email}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{!signInUser.email && signInErr.email}</Typography>
            <TextField
             margin="normal"
             required
             fullWidth
             autoFocus
            size="small"
            name="password"
            label="Password"
            type="password"
            id="password"
            value={signInUser.password}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary"  align='left'>{!signInUser.password && signInErr.password}</Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => {handleSubmit(e)}}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs >
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography  onClick={() => setShowSignIn(false)} variant="body2">
                  Don't have an account? <span className="text-blue">Sign Up</span>
                </Typography>
              </Grid>
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
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}