import React from "react";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import { Image } from "react-bootstrap";
import AddPostEdit from "./AddPostEdit";
import { useSelector } from 'react-redux';
import "./leftSide.css"
import { Typography } from "@mui/material";

function LeftSidebar({fetchPosts}) {
    const myInfo = useSelector(state => state.user.myInfo)
    // const [open, setOpen] = useState(false);
     

    return ( 
    <Box>
            <div className="left-side" >
            <Image src={myInfo?.avatar} />
            </div>
            <h4>{myInfo.name.toUpperCase()} {myInfo.surname.toUpperCase()}</h4>
            <Typography>{myInfo?.email}</Typography>
            <Typography>{myInfo?.role}</Typography>
            {/* <Button variant="containted" onClick={() => setOpen(true)}>Add new post</Button> */}
                {/* {open && <AddPostEdit  fetchPosts={fetchPosts} open={open} setOpen={setOpen}/>} */}
    </Box>
     );
}

export default LeftSidebar;