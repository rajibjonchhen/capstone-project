import { Box, Typography } from "@material-ui/core";
import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setMyInfoAction } from "../redux/actions/action";
import "./myAccount.css"

function Profile() {
    const dispatch = useDispatch()
    const[editProfile, setEditProfile] = useState(true)
    const [myProfile, setMyProfile] = useState({})
    const [error, setError] = useState("")
    const [isLoading,  setIsLoading] = useState(false)
    
    const myInfo = useSelector(state => state.user.myInfo)

    useEffect(() => {
        
        setMyProfile({
            name: myInfo.name,
            surname: myInfo.surname,
            email: myInfo.email
        })
    },[myInfo])

    const handleChange = (e) => {
        const {name, value} = e.target
        setMyProfile({...myProfile, [name]:value })
    }

    const saveChange = async() => {
        setError("")
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me`,{
                method:"PUT",
                body : JSON.stringify(myProfile),
                headers:{
                    "content-type" :"application/json",
                    "authorization" : localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data, response.status)
                setError(data.error)
                setIsLoading(false)
            } else{
                const data = await response.json()
                console.log(data)
                dispatch(setMyInfoAction(data.user))
                setIsLoading(false)
                setEditProfile(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return ( 
        <Box className="profile-box">
            <Box className='profile-image-box'>
                <Image src={myProfile?.avatar || `https://ui-avatars.com/api/?name=${myInfo?.name}+${myInfo?.surname}`} sx={{width:1}}/>
            </Box>
            <Box>
                <Button onClick={() => setEditProfile(false)}>Edit Profile</Button>
                <Button onClick={(e) => saveChange(e)}>Save Change</Button>
                {error.length > 0 && <Alert margin="normal" fullWidth severity="error">{error}</Alert>}
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="name"
            label="First Name"
            name="name"
            autoComplete="name"
            disabled={editProfile}
            value={myProfile?.name}
            onChange={(e) => handleChange(e)}
            />

            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="surname"
            label="Last Name"
            name="surname"
            autoComplete="surname"
            disabled={editProfile}
            value={myProfile?.surname}
            onChange={(e) => handleChange(e)}
            />

            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            autoFocus
            autoComplete="email"
            id="email"
            label="Email Address"
            name="email"
            disabled={editProfile}
            value={myProfile?.email}
            onChange={(e) => handleChange(e)}
            />


            </Box>
        </Box>
     );
}

export default Profile;