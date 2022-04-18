import { getListItemAvatarUtilityClass } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../others/Loader";
import { setAllProductsAction, setMyInfoAction } from "../redux/actions/action";
import SingleCard from "./SingleCard";
import './displayProducts.css'
import { useNavigate, useParams } from "react-router-dom";
import getMyInfo from "../getMyInfo";
import { Grid } from "@material-ui/core";

function DisplayProducts() {
    const [ error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const params = useParams()
    

    const navigate = useNavigate()
    const selectedCategory = useSelector(state => state.product.selectedCategory)
    const allProducts = useSelector(state => state.product.allProducts)

    useEffect(() => {
        const category = params.category
        fetchProducts(category)
    },[])

    

    const fetchProducts = async(category) => {
        try {
            console.log(process.env.REACT_APP_DEV_BE_URL)
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/products`,{
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
                const products = data.products.filter(product => product.category === category)
                console.log(products, selectedCategory)
                dispatch(setAllProductsAction(products))
                setIsLoading(false)

            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } 
    }


    return ( 
        <Grid container >
            {allProducts.length === 0 && <h2>There are no products in this category</h2>}
            {allProducts?.map((product, i) => <Grid item xs={12} sm={6} md={4} lg={3} style={{display:"flex", justifyContent:"center"}}>
                <SingleCard key={i} product={product}/>
            </Grid> 
            )}
            
        </Grid>
     );
}

export default DisplayProducts;