import { Grid } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import { useEffect } from "react";
import "./aboutUs.css"

function AboutUs() {

  useEffect(() =>{
    
  },[])
    return ( 

      <div className=" mt-5">
             <p className="h1 my-5">Who we are?</p>         
          <Grid container className="about-us" >
            <Grid item  xs={12} md={6}>
            <p>
               An idea can change the the world and
              together we can make a big difference in the society       
            </p>
            </Grid>
            <Grid item xs={12} md={6}>
              <img  src="https://blog.bonus.ly/hs-fs/hubfs/team-putting-together-puzzle-01.png?width=1200&name=team-putting-together-puzzle-01.png" />
            </Grid>
          </Grid>
                 
      </div>
      

     );
}

export default AboutUs;