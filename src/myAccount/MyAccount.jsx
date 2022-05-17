import { Grid } from "@material-ui/core";
import { Alert, Button, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import getMyInfo from "../getMyInfo";
import { setMyInfoAction } from "../redux/actions/action";
import "./myAccount.css";




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
            role: myInfo.role,
            bio: myInfo.bio,
            interest : myInfo.interest
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
        console.log(formData)
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

    return ( <div className="mt-3 p-5" style={{backgroundColor:"rgb(214,227,220)", borderRadius:"5px"}}>
        <p className="h3 text-dark">Update my Information</p>
            <Alert margin="normal"  severity="success" style={{opacity:successMsg? 1:0, width:"100%", margin:" 10px auto 0px"}}>Updated successfully</Alert>
    
       {myProfile && <Grid container className="account-box ">
            <Grid item xs={12}  md={4} lg={3} className='account-image-box '>
                
                
                <img src={myInfo?.avatar || `https://ui-avatars.com/api/?name=${myInfo?.name}+${myInfo?.surname}`}  style={{margin:"10px auto 0px", width:"100px"}}/>
                
                <Button
                    className="theme-btn"
                    variant="contained"
                    component="label"
                    size="small"
                    sx={{width:"150px", marginTop:"10px"}}
                    >
                    Change Image
                    <input
                        type="file"
                        hidden
                        onChange={(e) => {selectAvatar(e)}}
                        />
                </Button>
            </Grid>
            <Grid item xs={12}  md={8} lg={9}>
                {/* <Button className="theme-btn" onClick={() => setEditProfile(false)}>Edit Profile</Button> */}
                <Button className="theme-btn" onClick={(e) => saveChange(e)}>Save Change</Button>
                {error.length > 0 && <Alert margin="normal" fullWidth severity="error">{error}</Alert>}
           
            <TextField
            margin="normal"
            required
            fullWidth
            size="small"
            id="name"
            label="First Name"
            name="name"
           
            // disabled={editProfile}
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
            // disabled={editProfile}
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
            // disabled={editProfile}
            value={myProfile?.email}
            onChange={(e) => handleChange(e)}
            />

            <TextField
            margin="normal"
            
            fullWidth
            size="small"
            autoFocus
            id="bio"
            label="bio"
            name="bio"
             // disabled={editProfile}
            value={myProfile?.bio}
            onChange={(e) => handleChange(e)}
            />

            <TextField
            margin="normal"
            
            fullWidth
            size="small"
            autoFocus
            id="interest"
            label="interest"
            name="interest"
             // disabled={editProfile}

            value={myProfile?.interest}
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

            
            {/* <Autocomplete
      id="country-select-demo"
      sx={{ width: 300 }}
      options={countries}
      
      autoHighlight
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <img
            loading="lazy"
            width="20"
            src={`https://flagcdn.com/w20/${option.code.toLowerCase()}.png`}
            srcSet={`https://flagcdn.com/w40/${option.code.toLowerCase()}.png 2x`}
            alt=""
          />
          {option.label} ({option.code}) +{option.phone}
        </Box>
      )}
      renderInput={(params) => (
        <TextField
        label="Choose a country"
          {...params}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
         
        />
      )}
    />*/}

            </Grid>
        </Grid> }
        
        </div>);
}

export default MyAccount;