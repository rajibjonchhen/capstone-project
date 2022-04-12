
import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import SingleCard from "../products/SingleCard";
import { setMyProductsAction } from "../redux/actions/action";
import AddEditNewProduct from "./AddEditNewProduct";
import "./myProfile.css"


function MyProfile() {

    const [show, setShow] = useState("")
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const [moreInfo, setMoreInfo] = useState(false)
    
    const myProducts = useSelector(state => state.product.myProducts)

    const dispatch = useDispatch()
   

    const fetchMyProducts = async() => {
        try {
            console.log(process.env.REACT_APP_DEV_BE_URL)
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
                console.log(data.products)
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
    
    return (  
        <Grid container className="profile-box" spacing={2}>
            <Grid item xs={12} sm={12} md={3} lg={3}>
                <ul>
                    <li onClick={() => setShow("My Creations")}>
                        My Creations
                    </li>
                    <li onClick={() => setShow("")}>
                        Messages
                    </li>
                    <li onClick={() => setShow("Add New Product")}>
                        Add New Product
                    </li>
                </ul>
            </Grid>
            <Grid item xs={12} sm={12} md={9} lg={9}>
                <div style={{display: show === "My Creations"? "block":"none" }}>
                   {myProducts?.map(product => <SingleCard  product={product}/>)}
                </div>
                <div style={{display: show === "Add New Product"? "block":"none" }}>
                    <AddEditNewProduct moreInfo={moreInfo} setMoreInfo={setMoreInfo}/>
                </div>
            </Grid>
        </Grid>
    );
}

export default MyProfile;