import { Box, Typography } from "@material-ui/core";
import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Image } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import getMyInfo from "../getMyInfo";
import { setMyInfoAction } from "../redux/actions/action";
import "./myAccount.css"

function MyAccount() {
    const dispatch = useDispatch()
    const[editProfile, setEditProfile] = useState(true)
    const [myProfile, setMyProfile] = useState({})
    const [error, setError] = useState("")
    const [isLoading,  setIsLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)
    const [successMsg, setSuccessMsg] = useState(false)
    const myInfo = useSelector(state => state.user.myInfo)

    useEffect(() => {
        
        setMyProfile({
            name: myInfo.name,
            surname: myInfo.surname,
            email: myInfo.email,
            role: myInfo.role
        })
    },[myInfo])

    useEffect(() => {
        if(avatar){
            saveAvatar()
        }
    },[avatar])

    const handleChange = (e) => {
        const {name, value} = e.target
        setMyProfile({...myProfile, [name]:value })
    }

    const selectAvatar = (e) => {
        console.log(e.target.files[0])
        setAvatar(e.target.files[0])
    }
    const saveAvatar = async() => {
        const formData = new FormData()
        formData.append("avatar", avatar)
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me/avatar`,{
                method:"POST",
                body : formData,
                headers:{
                    "authorization" : localStorage.getItem("MyToken")
                }
            })
            if(response.ok){
                dispatch(setMyInfoAction(await getMyInfo()))
                setSuccessMsg(true)
                setTimeout(() => setSuccessMsg(false),1000)
            }else{
                setError("error on updating data")
            }
        }catch{
            console.log(error)
            setError(error)
        }
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
                setSuccessMsg(true)
                setTimeout(() => setSuccessMsg(false),2000)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
        }
    }

    return ( 
        <>
            {successMsg && <Alert margin="normal"  severity="success">Updated successfully</Alert>}
        <Box className="account-box">
            <Box className='account-image-box'>
                
                <Image src={myInfo?.avatar || `https://ui-avatars.com/api/?name=${myInfo?.name}+${myInfo?.surname}`} width="100px" sx={{marginTop:"10px"}}/>
                
                <Button
                    variant="contained"
                    component="label"
                    size="small"
                    >
                    Change Image
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {selectAvatar(e)}}
                        />
                </Button>
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

            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            autoFocus
            id="role"
            label="role"
            name="role"
            disabled
            value={myProfile?.role}
            onChange={(e) => handleChange(e)}
            />


            </Box>
        </Box>
            </>
     );
}

export default MyAccount;