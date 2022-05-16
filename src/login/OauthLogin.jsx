
import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { setRoleAction } from "../redux/actions/action";
import "./oauthLogin.css";


        
function OauthLogin() {
    
    const role = (state => state.user.role)

    const [searchParams, setSearchParams] = useSearchParams();

    const roleParams = searchParams.get("role") 
    const dispatch = useDispatch()
  
    useEffect(()=> {
        console.log("role ==",roleParams)
        dispatch(setRoleAction(roleParams))

    },[])

    return ( <Box style={{display:"flex",  justifyContent:'center'}}>
    
            
            
            
          <a style={{textDecoration:"none"}} href={role !== "investor"? `${process.env.REACT_APP_DEV_BE_URL}/users/googleLoginCreator` : `${process.env.REACT_APP_DEV_BE_URL}/users/googleLoginInvestor`}>
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