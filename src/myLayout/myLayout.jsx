
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { useDispatch } from "react-redux";
import MyFooter from "../footer/Myfooter";
import getMyInfo from "../getMyInfo";
import MyNavbar from "../myNavbar/MyNavbar";
import { setMyInfoAction } from "../redux/actions/action";
import "./myLayout.css";

function MyLayout({children}) {
    const navigate = useNavigate()
    const location = useLocation()
    const dispatch = useDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const tokenParam = searchParams.get("token") 

    useEffect(() => {
        const token = localStorage.getItem("MyToken")
        if(token){
            fetchMyInfo()
        } else  if(tokenParam){
            localStorage.setItem("MyToken", tokenParam)
            fetchMyInfo()
        }
    },[])

    const fetchMyInfo = async() => {
        dispatch(setMyInfoAction(await getMyInfo()))
    }
    return ( <>
        <MyNavbar/>
        {/* <ExtraNavbar /> */}
            {children}
        <div style={{display:location.pathname === "/profile" || "/posts"? "none" : "block", margin:"0"}}>
        <MyFooter/>
        </div>
    </>
     );
}

export default MyLayout;