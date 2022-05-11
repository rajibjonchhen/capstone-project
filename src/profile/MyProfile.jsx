
import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MyAccount from "../myAccount/MyAccount";
import SingleCard from "../products/SingleCard";
import { setMyProductsAction } from "../redux/actions/action";
import AddEditProduct from "./AddEditProduct";
import MyMessages from "./MyMessages";
import "./myProfile.css"
import ProfilSidebar from "./ProfilSidebar";


function MyProfile() {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    
    const myProducts = useSelector(state => state.product.myProducts)
    const profilePagination = useSelector(state => state.user.profilePagination)
    

    const dispatch = useDispatch()
   
    useEffect(() => {
        window.scrollTo(0,0)
    },[profilePagination])

    const fetchMyProducts = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/products/me`,{
                method:"GET",
                headers:{
                    "authorization" : localStorage.getItem("MyToken"),
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
            } else{
                const data = await response.json()
                dispatch(setMyProductsAction(data.products))
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } 
    }

    useState(() => {
        fetchMyProducts()
    },[])
    
    return (<Container style={{ minHeight:"70vh", padding:"20px" }}>  
                <Row   >
                    <Col>
                        <ProfilSidebar/>
                    </Col>
                    <Col  xs={10} >
                            <Row  className=" mt-3 py-3" style={{display: profilePagination === "My Creations"? "flex":"none",alignItems:"center", justifyContent:"center", color:"gray" }}>
                                {myProducts?.length === 0 && <Typography variant="h3" paragraph>You do not have any creation yet</Typography>}
                                {myProducts?.map((product, i) => 
                                <Col  key={i} item xs={12} sm={6} md={4} lg={3} style={{display:"flex", justifyContent:"center"}}>
                                    <SingleCard product={product} fetchMyProducts={fetchMyProducts}/>
                                </Col> )}
                            </Row>
                        
                <div style={{display: profilePagination === "My Messages"? "block":"none" }}>
                    <MyMessages />
                </div>
                <div style={{display: profilePagination === "Add New Product"? "block":"none" }}>
                    <AddEditProduct key={1} moreInfo={moreInfo} setMoreInfo={setMoreInfo}/>
                </div>
                <div style={{display: profilePagination === "My Account"? "block":"none" }}>
                    <MyAccount/>
                </div>

                </Col>
            </Row>
       
            </Container> );
}

export default MyProfile;