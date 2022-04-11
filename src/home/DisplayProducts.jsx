import { getListItemAvatarUtilityClass } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../others/Loader";
import { setAllProductsAction, setMyInfoAction } from "../redux/actions/action";
import SingleCard from "./SingleCard";
import './displayProducts.css'
import { useNavigate } from "react-router-dom";
import getMyInfo from "../getMyInfo";

function DisplayProducts() {
    const [ error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const [products, setProducts] = useState(Array.apply(null, Array(20)))

    const navigate = useNavigate()
   

    useEffect(() => {
       
       
        fetchProducts()
    },[])

    

    const fetchProducts = async() => {
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
                console.log(data)
                dispatch(setAllProductsAction(data.user))
                setIsLoading(false)
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        } 
    }


    return ( 
        <div className='home-page '>
           {products.map((item, i) =>  <SingleCard key={i}/>)}
           
        </div>
     );
}

export default DisplayProducts;