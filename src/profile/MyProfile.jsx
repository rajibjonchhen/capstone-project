
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MyAccount from "../myAccount/MyAccount";
import SingleCard from "../products/SingleCard";
import { setMyProductsAction, setProductsLikedAction } from "../redux/actions/action";
import AddEditProduct from "./AddEditProduct";
import MyMessages from "./MyMessages";
import "./myProfile.css";
import ProfilSidebar from "./ProfilSidebar";


function MyProfile() {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    
    const myProducts = useSelector(state => state.product.myProducts)
    const myInfo = useSelector(state => state.user.myInfo)
    const profilePagination = useSelector(state => state.user.profilePagination)
    const productsLiked = useSelector(state => state.product.productsLiked)
     
    useEffect(() => {
        fetchMyProducts()
        getProductsLiked()

    },[])

    const dispatch = useDispatch()
   
    useEffect(() => {
        window.scrollTo(0,0)
    },[profilePagination])

    const getProductsLiked = async() => {
        console.log("getProductsLiked")
        try {
          const response = await fetch(
            `${process.env.REACT_APP_DEV_BE_URL}/users/me/productsLiked`, {
              method : "GET",
              headers :{
                authorization : localStorage.getItem("MyToken")
              }
            }
      
          )
          if(response.status !== 200){
            const data = await response.json()
            console.log(data);
            setError(data.error);
            setIsLoading(false);
          } else {
            const data = await response.json()
            console.log("getProductsLiked",data.productsLiked)
            setIsLoading(false);
            dispatch(setProductsLikedAction(data.productsLiked))
          }
        } catch (error) {
          console.log(error)
          setError(error)
        }
      } 

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

   
    
    return (<Container style={{ minHeight:"70vh", padding:"20px",  }}>  
                <Row   className="h-100">
                    <Col  xs={3} sm={3} md={3} lg={3} className="profile-sidebar  d-flex" >
                      
                            <ProfilSidebar/>
                        
                    </Col>
                    
                    <Col  xs={9} sm={3} md={9} lg={9} style={{ minHeight:"70vh"}} >
                        {/* showing my creation */}
                            <Row  className=" mt-3 py-3" style={{display: profilePagination === "My Creations"? "flex":"none",alignItems:"center", justifyContent:"center", color:"gray" }}>
                                {myProducts?.length === 0 && <Typography variant="h3" paragraph>You do not have any creation yet</Typography>}
                                {myProducts?.map((product, i) => 
                                <Col  key={i} item xs={12} sm={6} md={4}  style={{display:"flex", justifyContent:"center"}}>
                                   <div className="py-2 px-0 w-100">
                                    <SingleCard product={product} fetchMyProducts={fetchMyProducts} getProductsLiked={getProductsLiked}/>
                                </div>
                                    
                                </Col> )}
                            </Row>

                                {/* showing projects liked */}
                            <Row  className=" mt-3 py-3" style={{display: profilePagination === "Projects Liked"? "flex":"none",alignItems:"center", justifyContent:"center", color:"gray" }}>
                                {productsLiked?.length === 0 && <Typography variant="h3" paragraph>You do not have any projects liked</Typography>}
                                {productsLiked?.map((product, i) => 
                                <Col  key={i}  xs={12} sm={6} md={4}  style={{display:"flex", justifyContent:"center"}}>
                                    <div className="py-2 px-0 w-100">

                                        <SingleCard getProductsLiked={getProductsLiked} product={product} fetchMyProducts={fetchMyProducts}/>
                                    </div>
                                </Col> )}
                            </Row>
                        
                <div style={{display: profilePagination === "My Messages"? "block":"none" }}>
                    <MyMessages />
                </div>
                <div style={{display: profilePagination === "Add New Product"? "block":"none" }}>
                    <AddEditProduct key={1} moreInfo={moreInfo} setMoreInfo={setMoreInfo} fetchMyProducts={fetchMyProducts}/>
                </div>
                <div style={{display: profilePagination === "My Account"? "block":"none" }}>
                    <MyAccount/>
                </div>

                </Col>
            </Row>
       
            </Container> );
}

export default MyProfile;