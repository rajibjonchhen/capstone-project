import { Home } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function ErrorPage() {
    const navigate = useNavigate()
    return ( 
        <div style={{height:"100vh", margin:"18% auto"}}>
            <Typography variant="h1">
                Page not found <br/> <strong>404</strong> 
            </Typography>
            <Typography variant="h3">
                Go to Home Page 
            </Typography>
            <Home  sx={{fontSize:"70px"}} onClick={() => navigate("/home")}/>
        </div>
     );
}

export default ErrorPage;