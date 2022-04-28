import { setAllProductsAction } from "./redux/actions/action"




    const getMyAllProducts = async() => {
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
                return null
                
            } else{
                const data = await response.json()
                return data.products
                
            }
        } catch (error) {
            console.log(error)
            
        } 
    }

    export default getMyAllProducts