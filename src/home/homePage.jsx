import { getListItemAvatarUtilityClass } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Loader from "../others/Loader";
import { setMyInfoAction } from "../redux/actions/action";
import SingleCard from "./SingleCard";
import './homePage.css'

function Home() {
    const [ error, setError] = useState("")
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useDispatch()
    const [products, setProducts] = useState(Array.apply(null, Array(20)))

   

    useEffect(() => {
        fetchMyInfo()
    },[])

    const fetchMyInfo = async() => {
        try {
            console.log(process.env.REACT_APP_DEV_BE_URL)
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me`,{
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
                dispatch(setMyInfoAction(data.user))
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
           {products.map(item =>  <SingleCard/>)}
            {isLoading && <Loader/>}
        </div>
     );
}

export default Home;