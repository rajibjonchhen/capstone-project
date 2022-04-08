// import { Box, Button, TextField, Typography } from "@material-ui/core";
// import { AspectRatio } from "@mui/icons-material";
// import { useEffect, useState } from "react";

// function SignIn({ setShowSignIn }) {
//     const [isSubmit, setIsSubmit] = useState(false)
//     const [signInErr, setSignInErr] = useState({})
//     const [signInUser, setSignInUser] = useState({
//     email: "",
//     password: "",
//   });

// useEffect(() => {
    
// },[signInErr])

// const handleChange = (e) => {
//     const {name, value} = e.target
//     setSignInUser({...signInUser, [name]:value})
//     console.log(signInUser.email)
// } 

// const handleSubmit = (e) => {
//     e.preventDefault()
//     setSignInErr(validateForm(signInUser))
//     setIsSubmit(true)
    
//     if(Object.keys(signInErr).length === 0 && isSubmit){
//         console.log("I am going to submit")
//         loginUser()
//     }
    
// }

// const validateForm = (signInUser) => {
//     const regex = /\S+@\S+\.\S+/
//     const errors = {} 
//     errors.email = !signInUser.email? "email is missing" : (!regex.test(signInUser.email))? "Email is not valid":""
//     errors.password = !signInUser.password? "password is missing":""
//     return errors
// }

// const loginUser = async()=> {
// console.log("login User is invoked")
// }

//   return (
//     <div className="myContainer App-header">
//       <Box
//         component="form"
//         sx={{
//           "& > :not(style)": { m: 2, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//       >
//         Sign In
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             margin="dense"
//             name="email"
//             value={signInUser.email}
//             onChange={(e) => handleChange(e)}
//             required
//           />
//           <Typography >{signInErr.email}</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//             margin="dense"
//             name="password"
//             value={signInUser.password}
//             onChange={(e) => handleChange(e)}
//             required
//             />
//             <Typography>{signInErr.password}</Typography>
//           <Button variant='contained' onClick={(e) => handleSubmit(e)}>SignIn</Button>
//           <Typography>
//             Become a member{" "}
//             <span className="pointer" onClick={() => setShowSignIn(false)}>
//               register
//             </span>
//           </Typography>
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default SignIn;

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Alert } from '@mui/material';

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

export default function SignIn({setShowSignIn}) {
    const [error, setError] = React.useState("")
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [signInErr, setSignInErr] = React.useState({})
    const [signInUser, setSignInUser] = React.useState({
    email: "",
    password: "",
  });

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
        }
    } catch (error) {
        console.log(error)
    }
}


  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
         {error.length > 0 && <Alert fullWidth severity="error">{error}</Alert>}
          
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={signInUser.email}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{signInErr.email}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signInUser.password}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary"  align='left'>{signInErr.password}</Typography>
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
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Typography onClick={() => setShowSignIn(false)} variant="body2">
                  {"Don't have an account? Sign Up"}
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}