import { Flare } from "@mui/icons-material";
import { Avatar, Box, Typography } from "@mui/material";
import { useState } from "react";
import OauthLogin from "./OauthLogin";
import SignIn from "./SignIn";
import SignUp from "./SignUp";





function LoginPage() {
    const [showSignIn, setShowSignIn] = useState(false)

    return ( 
        <Box className=" mt-3 py-3">

            <Box className="theme-color" sx={{ display: 'flex', alignItems: 'center', mt:2, justifyContent:'center',color:"white" }}>
                <Flare className="App-logo"/>
                <Typography sx={{fontWeight: 'bold',fontSize: 26}} > Creator's Space</Typography>
            </Box>
        
                
            <Box style={{display:showSignIn? "block":"none"}}>
                    <SignIn setShowSignIn={setShowSignIn}/>
            </Box>
            <Box  style={{display:!showSignIn? "block":"none"}}>
                    <SignUp setShowSignIn={setShowSignIn}/>
            </Box>
            
        </Box>
     );
}

export default LoginPage;