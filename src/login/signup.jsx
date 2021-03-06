

import { IconButton } from '@material-ui/core';
import { VisibilityOff } from '@mui/icons-material';
import {
  Alert, FormControl, InputLabel,
  MenuItem,
  Select
} from '@mui/material';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Link from '@mui/material/Link';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setMyInfoAction } from '../redux/actions/action';
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

const SignUp = ({setShowSignIn})  => {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const role = useSelector(state => state.user.role)

  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(true)
  const [isSubmit, setIsSubmit] = useState(false)
  const [signUpErr, setSignUpErr] = useState({})
  
  
    const [signUpUser, setSignUpUser] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    repassword: "",
    role:""
  });

  useEffect(() => {
    window.scrollTo(0, 0)
    if(role){
      setSignUpUser({...signUpUser, role:role})
    }
  }, [])

  useEffect(() => {
    if(Object.keys(signUpErr).length === 0 && isSubmit){
        console.log("I am going to submit")
        registerUser()
    }
  },[signUpErr])

  const handleChange = (e) => {
    console.log("signUpUser", signUpUser)
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
    
    if(!signUpUser.repassword){
        errors.repassword = "repassword is missing"
    }else if(signUpUser.repassword !== signUpUser.password){
        errors.repassword = "password and repassword doesn ot match"
      }
    

    if(!signUpUser.name){

        errors.name =  "name is missing"
    }
    if(!signUpUser.surname ){
        errors.surname = "surname is missing"
    }
    if(!signUpUser.role ){
        errors.role = "role is missing"
    }
    
    return errors
}

const registerUser = async() => {
try {
    console.log(process.env.REACT_APP_PROD_BE_URL)
    console.log(signUpUser)
    const response = await fetch(`${process.env.REACT_APP_PROD_BE_URL}/users/signUp`,{
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
      <Container maxWidth="xs" className='theme-light-bg mt-3 py-3 text-dark'>
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
          {/* name field */}
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

          {/* surname field */}
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
            
          {/* email field */}
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
            <Typography color="secondary" align='left'>{!signUpUser.email && signUpErr.email || signUpUser.email && signUpErr.email} </Typography>
            
          {/* password field */}
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            name="password"
            label="Password"
            type= {showPassword? "password":"password"}
            id="password"
            value={signUpUser.password}
            onChange={(e) => handleChange(e)}
            endadornment={<IconButton> <VisibilityOff /> </IconButton>}
            />
            <Typography color="secondary"  align='left'>{!signUpUser.password && signUpErr.password}</Typography>
            
          {/* password field */}
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            name="repassword"
            label="RePassword"
            type= {showPassword? "password":"password"}
            id="password"
            value={signUpUser.repassword}
            onChange={(e) => handleChange(e)}
            endadornment={<IconButton> <VisibilityOff /> </IconButton>}
            />
            <Typography color="secondary"  align='left'>{!signUpUser.repassword  &&  signUpErr?.repassword || signUpUser.repassword !== signUpUser.password &&  signUpErr?.repassword }</Typography>
            
          {/* role field */}
            

            <FormControl 
                className="blue-input"
                  margin="normal"
                  required
                  fullWidth
                  variant="outlined"
                  size="small"
                  id="role"
                  
                  name="role"
              >
                <InputLabel id="demo-simple-select-label">Role</InputLabel>
                <Select
               
                  margin="none"
                  labelId="role"
                  size="small"
                  id="role"
                  variant="outlined"
                  label="role"
                  name="role"
                  onChange={handleChange}
                  value={signUpUser.role}
                  default="creator"
                >
                  {["creator","investor"].map((category, i) => (
                    <MenuItem key={i} value={category}>{category}</MenuItem>
                  ))}
                </Select>
              </FormControl>

            <Typography color="secondary"  align='left'>{!signUpUser.role  &&    signUpErr?.role }</Typography>
            
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


export default SignUp