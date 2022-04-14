
import { Grid } from "@material-ui/core";
import { Typography } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MyAccount from "../myAccount/MyAccount";
import SingleCard from "../products/SingleCard";
import { setMyProductsAction } from "../redux/actions/action";
import AddEditNewProduct from "./AddEditNewProduct";
import MyMessages from "./MyMessages";
import "./myProfile.css"


function MyProfile() {

    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    
    const myProducts = useSelector(state => state.product.myProducts)
    const profilePagination = useSelector(state => state.user.profilePagination)
    

    const dispatch = useDispatch()
   

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
    
    return (<>  
                <Grid  container >
                    <Grid item xs={12} >
                            <Grid container style={{display: profilePagination === "My Creations"? "block":"none" }}>
                                {myProducts?.length === 0 && <Typography variant="h2" paragraph>You do not have any creation yet</Typography>}
                                {myProducts?.map((product, i) => 
                                <Grid  key={i} item xs={12} sm={12} md={6} lg={4}>
                                    <SingleCard product={product}/>
                                </Grid> )}
                            </Grid>
                        
                <div style={{display: profilePagination === "My Messages"? "block":"none" }}>
                    <MyMessages />
                </div>
                <div style={{display: profilePagination === "Add New Product"? "block":"none" }}>
                    <AddEditNewProduct moreInfo={moreInfo} setMoreInfo={setMoreInfo}/>
                </div>
                <div style={{display: profilePagination === "My Account"? "block":"none" }}>
                    <MyAccount/>
                </div>

                </Grid>
            </Grid>
       
            </> );
}

export default MyProfile;