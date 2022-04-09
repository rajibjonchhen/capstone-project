import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MyFooter from "../footer/MyFooter";
import MyNavbar from "../myNavbar/MyNavbar";
import "./myLayout.css"

function MyLayout({children}) {
    const navigate = useNavigate()
    useEffect(() => {
        const token = localStorage.getItem("MyToken")
        if(!token){
            navigate("/")
        }
    },[])
    return ( <>
        <MyNavbar/>
        <Container fluid className="myLayout-box">
        {children}
        </Container>
        <MyFooter/>
    </>
     );
}

export default MyLayout;