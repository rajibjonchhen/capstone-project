import React from "react";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import { Image } from "react-bootstrap";
import AddPostEdit from "./AddPostEdit";
import { useSelector } from 'react-redux';
function LeftSidebar() {
    const myInfo = useSelector(state => state.user.myInfo)
    const [open, setOpen] = useState(false);
     

    return ( <Box>
        <Image src={myInfo?.avatar}/>
        <Button variant="containted" onClick={() => setOpen(true)}>Add new post</Button>
            {open && <AddPostEdit  open={open} setOpen={setOpen}/>}
    </Box>
     );
}

export default LeftSidebar;