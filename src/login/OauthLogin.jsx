
import { Box, Typography } from "@mui/material";
import {AiOutlineGooglePlus, AiFillApple} from "react-icons/ai"
import {FaFacebookSquare} from "react-icons/fa"
import "./oauthLogin.css"

function OauthLogin() {
    return ( <Box style={{display:"flex",  justifyContent:'center'}}>
    
          <a href={`${process.env.REACT_APP_DEV_BE_URL}/users/googleLogin`}>
          <Box className = "continue-with-btn pointer" ><AiOutlineGooglePlus/>
                Google</Box>
          </a>
              <Box className = "continue-with-btn pointer"><FaFacebookSquare/>
             Facebook</Box>
          <Box className = "continue-with-btn pointer">  <AiFillApple/>
              Apple
          </Box>
    </Box> );
}

export default OauthLogin;