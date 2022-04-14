import { Grid } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import { useState } from "react";
import "./extraHeader.css"

function ExtraNavbar() {
    
    return ( 
    <Grid  className="extra-header">
        <Grid container >
            <Grid item xs={12} sm={12} md={10} lg={8} style={{margin:"auto", display:"flex",justifyContent:"space-between"}}>
                <Button  >My Creations</Button>
                <Button>My Messages</Button>
                <Button>Add New Product</Button>
                <Button>My Account</Button>
                    {/* <ul>
                            <li onClick={() => setShow("My Creations")}>
                                My Creations
                            </li>
                            <li onClick={() => setShow("My Messages")}>
                                My Messages
                            </li>
                            <li onClick={() => setShow("Add New Product")}>
                                Add New Product
                            </li>
                            <li onClick={() => setShow("My Account")}>
                                My Account
                            </li>
                        </ul> */}
            </Grid> 
        </Grid> 
    </Grid> );
}

export default ExtraNavbar;