import { Flare } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setRoleAction } from "../redux/actions/action";
import SignIn from "./SignIn";
import SignUp from "./SignUp";





function LoginPage() {

    const [showSignIn, setShowSignIn] = useState(true)

    const [searchParams, setSearchParams] = useSearchParams();

    const roleParams = searchParams.get("role") 
    const dispatch = useDispatch()
  
    useEffect(()=> {
        console.log("role ==",roleParams)
        dispatch(setRoleAction(roleParams))
    },[])

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