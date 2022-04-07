import { useState } from "react";

import SignIn from "./SignIn";
import SignUp from "./SignUp";


function LoginPage() {
    const [showSignIn, setShowSignIn] = useState(false)
    return ( 
        <div>Login Page
            
            <div style={{display:showSignIn? "block":"none"}}>
                    <SignIn setShowSignIn={setShowSignIn}/>
            </div>
            <div  style={{display:!showSignIn? "block":"none"}}>
                    <SignUp setShowSignIn={setShowSignIn}/>
            </div>
            
        </div>
     );
}

export default LoginPage;