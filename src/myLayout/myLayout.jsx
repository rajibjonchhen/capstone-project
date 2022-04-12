import { Container } from "react-bootstrap";
import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import MyFooter from "../footer/MyFooter";
import MyNavbar from "../myNavbar/MyNavbar";
import "./myLayout.css"
import getMyInfo from "../getMyInfo";
import { setMyInfoAction } from "../redux/actions/action";
import { useDispatch } from "react-redux";

function MyLayout({children}) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const tokenParam = searchParams.get("token") 

    useEffect(() => {
        const token = localStorage.getItem("MyToken")
        if(!token){
            if(!tokenParam){
                navigate("/")
            } else{
                localStorage.setItem("MyToken", tokenParam)
                fetchMyInfo()
            }
        }else{
            localStorage.setItem("MyToken", token)
            fetchMyInfo()
        }
    },[])

    const fetchMyInfo = async() => {
        dispatch(setMyInfoAction(await getMyInfo()))
    }
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