import { setMyInfoAction } from "./redux/actions/action"

const  getMyInfo =async() => {
    
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
                
                return null
            } else{
                const data = await response.json()
                console.log(data)
                return data.user
            
            }
        } catch (error) {
            console.log(error)
            return null
        } 
    }

    export default  getMyInfo 
