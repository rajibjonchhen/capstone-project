
import { ArrowBackIosNew, ArrowForward, ArrowForwardIosOutlined, KeyboardArrowLeftOutlined } from "@mui/icons-material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MyAccount from "../myAccount/MyAccount";
import SingleCard from "../products/SingleCard";
import { setMyProductsAction, setProductsLikedAction, setProfilePaginationAction } from "../redux/actions/action";
import AddEditProduct from "./AddEditProduct";
import MyMessages from "./MyMessages";
import "./myProfile.css";
import ProfilSidebar from "./ProfilSidebar";


function MyProfile() {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    const [showProfileMenu, setShowProfileMenu] = useState(false)
    
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
        // console.log("getProductsLiked")
        try {
          const response = await fetch(
            `${process.env.REACT_APP_PROD_BE_URL}/users/me/productsLiked`, {
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
            // console.log("getProductsLiked",data.productsLiked)
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
            const response = await fetch(`${process.env.REACT_APP_PROD_BE_URL}/products/me`,{
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

    const handlePagination = (e) => {
    dispatch(setProfilePaginationAction(e.target.name)); 
    setShowProfileMenu(false)
   }
    
    return (<Container style={{ minHeight:"70vh", padding:"20px",  }}> 
                  
                <Row   className="h-100">
                    <Col className="h-100 profile-mobile"  md={3} lg={3}  style={{ backgroundColor:"rgb(4,52,71)"}} >
                    <div className="arrow-btn text-left" onClick={() => setShowProfileMenu(!showProfileMenu)} style={{ transform: showProfileMenu? "rotate(90deg)":"rotate(0deg)"}}>
                        <ArrowForwardIosOutlined/>
                    </div> 
                      <div className="h-100" style={{ display:showProfileMenu? "block":"none", }}>
                            <ProfilSidebar handlePagination={handlePagination} />
                      </div>
                        
                    </Col>
                    <Col   md={3} lg={3}  style={{ backgroundColor:"rgb(4,52,71)"}} >
                      <div className="profile-sidebar" style={{ backgroundColor:"rgb(4,52,71)"}}>
                            <ProfilSidebar handlePagination={handlePagination} />
                      </div>
                        
                    </Col>
                    
                    <Col  xs={12} sm={12} md={9} lg={9} className="offset-xs-2 offset-sm-2 offset-md-3 offset-lg-3" style={{ minHeight:"70vh"}} >
                        {/* showing my creation */}
                            <Row  className="  profile-rightside" style={{display: profilePagination === "My Creations"? "flex":"none",alignItems:"center", justifyContent:"center", color:"gray" }}>
                                {myProducts?.length === 0 && <Typography variant="h3" paragraph>You do not have any creation yet</Typography>}
                                {myProducts?.map((product, i) => 
                                <Col  key={i}  xs={12} sm={12} md={6} lg={4}  style={{display:"flex", justifyContent:"center"}}>
                                   <div className="py-2 px-0 w-100">
                                    <SingleCard product={product} fetchMyProducts={fetchMyProducts} getProductsLiked={getProductsLiked}/>
                                </div>
                                    
                                </Col> )}
                            </Row>

                                {/* showing projects liked */}
                            <Row  className=" profile-rightside" style={{display: profilePagination === "Projects Liked"? "flex":"none",alignItems:"center", justifyContent:"center", color:"gray" }}>
                                {productsLiked?.length === 0 && <Typography variant="h3" paragraph>You do not have any projects liked</Typography>}
                                {productsLiked?.map((product, i) => 
                                <Col  key={i}  xs={12} sm={6} md={4}  style={{display:"flex", justifyContent:"center"}}>
                                    <div className="py-2 px-0 w-100">

                                        <SingleCard getProductsLiked={getProductsLiked} product={product} fetchMyProducts={fetchMyProducts}/>
                                    </div>
                                </Col> )}
                            </Row>
                        
                <div className="profile-rightside" style={{display: profilePagination === "My Messages"? "block":"none" }}>
                    <MyMessages />
                </div>
                <div className="profile-rightside" style={{display: profilePagination === "Add New Product"? "block":"none" }}>
                    <AddEditProduct key={1} moreInfo={moreInfo} setMoreInfo={setMoreInfo} fetchMyProducts={fetchMyProducts}/>
                </div>
                <div className="profile-rightside" style={{display: profilePagination === "My Account"? "block":"none" }}>
                    <MyAccount/>
                </div>

                </Col>
            </Row>
       
            </Container> );
}

export default MyProfile;