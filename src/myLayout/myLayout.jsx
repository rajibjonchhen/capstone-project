
import { useEffect } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import { Grid } from "@material-ui/core";
import { Container } from "@mui/material";
import { useDispatch } from "react-redux";
import ExtraNavbar from "../extraNavbar/ExtraNavbar";
import MyFooter from "../footer/myfooter";
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
        <div style={{display:location.pathname === "/profile"? "block":"none"}}>
        <ExtraNavbar />
        </div>
        <Container fluid className="myLayout-box" >

        <Grid container >
                    <Grid item xs={12} sm={12} md={10} lg={10} className="content-center">
                        {children}
                    </Grid>
                </Grid>
        </Container>
        <MyFooter/>
    </>
     );
}

export default MyLayout;