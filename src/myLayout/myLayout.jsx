import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyFooter from "../footer/MyFooter";
import MyNavbar from "../myNavbar/MyNavbar";

function MyLayout({children}) {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("MyToken")
        if(!token){
            navigate("/Login")
        }
    },[])
    return ( <>
        <MyNavbar/>
        {children}
        <MyFooter/>
    </>
     );
}

export default MyLayout;