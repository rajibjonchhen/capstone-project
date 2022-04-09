import React from "react";
import { Box, Button } from "@material-ui/core";
import { useState } from "react";
import { Image } from "react-bootstrap";
import AddPostEdit from "./AddPostEdit";

function LeftSidebar() {
    const [open, setOpen] = useState(false);

    return ( <Box>
        <Image src="https://ui-avatars.com/api/?name=John+Doe"/>
        <Button onClick={() => setOpen(true)}>Add new</Button>
            {open && <AddPostEdit  open={open} setOpen={setOpen}/>}
    </Box>
     );
}

export default LeftSidebar;