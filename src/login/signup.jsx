import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Flare, PhotoCamera } from "@mui/icons-material";
import { CssBaseline } from "@mui/material";

function SignUp({setShowSignIn}) {
    return ( 
        <div>
            <p>Already a member <span className="pointer" onClick={() => setShowSignIn(true)}>signIn</span></p>
        </div>
     );
}

export default SignUp;