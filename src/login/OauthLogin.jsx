
import { Avatar, Box, Typography } from "@mui/material";
import {AiOutlineGooglePlus, AiFillApple} from "react-icons/ai"
import {FaFacebookSquare} from "react-icons/fa"
import "./oauthLogin.css"


        
function OauthLogin() {
    return ( <Box style={{display:"flex",  justifyContent:'center'}}>
    
            
            
            
          <a style={{textDecoration:"none"}} href={`${process.env.REACT_APP_DEV_BE_URL}/users/googleLogin`}>
          <Box className = "continue-with-btn pointer" >
              <img className="oauth-icon"  src="https://res.cloudinary.com/dai5duzoj/image/upload/v1649765911/creators-space-products/ajmzft8zovrlpewx3un9.png"/>
                Google
            </Box>
          </a>
              <Box className = "continue-with-btn pointer">
                  <img className="oauth-icon"  src="https://res.cloudinary.com/dai5duzoj/image/upload/v1649765911/creators-space-products/cvl42vogtfspyll6mpf5.png"/>
             Facebook</Box>
          <Box className = "continue-with-btn pointer"> 
                <img className="oauth-icon"  src="https://res.cloudinary.com/dai5duzoj/image/upload/v1649765912/creators-space-products/fkhp9mgykkdj3uemiqqi.png"/>
              LinkedIn
          </Box>
    </Box> );
}

export default OauthLogin;