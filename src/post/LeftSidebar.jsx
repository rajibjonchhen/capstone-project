import React from "react";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import AddPostEdit from "./AddPostEdit";
import { useSelector } from 'react-redux';
import "./leftSide.css"
import { Typography } from "@mui/material";
import { Container } from "react-bootstrap";

function LeftSidebar({fetchPosts}) {
    const myInfo = useSelector(state => state.user.myInfo)
    // const [open, setOpen] = useState(false);
     

    return ( 
    <Container className="left-side" >
            <div className=" post-bg-color" >
            <img src={myInfo?.avatar} alt="avatar" />
            </div>
            <h4>{myInfo.name} {myInfo.surname}</h4>
            <Typography>{myInfo?.email}</Typography>
            <Typography>{myInfo?.role}</Typography>
            {/* <Button variant="containted" onClick={() => setOpen(true)}>Add new post</Button> */}
                {/* {open && <AddPostEdit  fetchPosts={fetchPosts} open={open} setOpen={setOpen}/>} */}
    </Container>
     );
}

export default LeftSidebar;