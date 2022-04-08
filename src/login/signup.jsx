// import { Box, TextField, Typography } from "@material-ui/core";
// import { Button, CssBaseline } from "@mui/material";
// import { useState } from "react";

// function SignUp({ setShowSignIn }) {

//     const [isSubmit, setIsSubmit] = useState(false)
//     const [signUpUserErr, setSignUpUserEErr] = useState({})
//     const [signUpUser, setSignUpUser] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setSignUpUser({ ...signUpUser, [name]: value });
//     console.log(signUpUser.email);
//   };
  
//   const handleSubmit = (e) => {
//     e.preventDefault()
//     setSignUpUserEErr(validateForm(signUpUser))
//     setIsSubmit(true)
//      registerUser()
// }

// const validateForm = (signInUser) => {
//     const regex = /\S+@\S+\.\S+/
//     const errors = {} 
//     errors.email = !signUpUser.email? "email is missing" : (!regex.test(signUpUser.email))? "Email is not valid":""
//     errors.password = !signUpUser.password? "password is missing":""
//     errors.name = !signUpUser.name? "name is missing":""
//     errors.surname = !signUpUser.surname? "surname is missing":""
//     return errors
// }

// const registerUser = async() => {

// }

//   return (
//     <div className="myContainer App-header">
//       Sign Up
//       <Box
//         component="form"
//         sx={{
//           "& > :not(style)": { m: 2, width: "25ch" },
//         }}
//         noValidate
//         autoComplete="off"
//         className="bg-primary"
//       >
//         <div>
//           <TextField
//             id="outlined-basic"
//             label="Name"
//             variant="outlined"
//             margin="dense"
//             name="name"
//             value={signUpUser.name}
//             onChange={(e) => handleChange(e)}
//             required
//           />
//           <Typography>{signUpUserErr.name}</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Surname"
//             variant="outlined"
//             margin="dense"
//             name="surname"
//             value={signUpUser.surname}
//             onChange={(e) => handleChange(e)}
//             required
//             />
//             <Typography>{signUpUserErr.surname}</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Email"
//             variant="outlined"
//             margin="dense"
//             name="email"
//             value={signUpUser.email}
//             onChange={(e) => handleChange(e)}
//             required
//             />
//             <Typography>{signUpUserErr.email}</Typography>
//           <TextField
//             id="outlined-basic"
//             label="Password"
//             variant="outlined"
//             margin="dense"
//             name="password"
//             value={signUpUser.password}
//             onChange={(e) => handleChange(e)}
//             required
//             />
//             <Typography>{signUpUserErr.password}</Typography>
//            <Button variant='contained' onClick={(e) => handleSubmit(e)}>Register</Button>
//           <Typography>
//             Already a member{" "}
//             <span className="pointer" onClick={() => setShowSignIn(true)}>
//               signIn
//             </span>
//           </Typography>
//         </div>
//       </Box>
//     </div>
//   );
// }

// export default SignUp;


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
    const [isSubmit, setIsSubmit] = React.useState(false)
    const [signUpErr, setSignUpErr] = React.useState({})
    const [signUpUser, setSignUpUser] = React.useState({
    name: "",
    surname: "",
    email: "",
    password: "",
  });

  React.useEffect(() => {
    console.log(isSubmit)
    console.log("signUpErr", signUpErr)
    console.log(Object.keys(signUpErr).length)
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

const validateForm = (signInUser) => {
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
console.log("registering now")
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
          <Box sx={{ display: 'flex', alignItems: 'left' }}>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, width: '100%' }}>
            <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="First Name"
            name="name"
            autoComplete="name"
            autoFocus
            value={signUpUser.name}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{signUpErr.name}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            id="surname"
            label="Last Name"
            name="surname"
            autoComplete="surname"
            autoFocus
            value={signUpUser.suname}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{signUpErr.surname}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={signUpUser.email}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary" align='left'>{signUpErr.email}</Typography>
            <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={signUpUser.password}
            onChange={(e) => handleChange(e)}
            />
            <Typography color="secondary"  align='left'>{signUpErr.password}</Typography>
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
          </Box>
          {/* <Box sx={{ mt: 2, width: '100%' }}>
              <Box sx={{border: 1, m:1}}> <AiOutlineGooglePlus />
                Continue with Google</Box>
              <Box sx={{border: 1, m:1}}> <FaFacebookSquare />
              Continue with Facebook</Box>
          </Box>
          <Box>  <AiFillApple />
              Continue with Apple
          </Box> */}
        </Box>
        <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              onClick={(e) => handleSubmit(e)}
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
                <Typography onClick={() => setShowSignIn(true)} variant="body2">
                  {"Already a member? Sign In"}
                </Typography>
              </Grid>
            </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
