import { Grid } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import "./ourMission.css"

function OurMission() {
    return ( 

      <Grid container className="mission-box" >
      <Grid item xs={12} md={8} style={{margin:"auto", display:"flex",justifyContent:"center"}}>
          <div>
              
                <h3>---------- Our Mission ----------</h3>
                <p> 
               Set the environment for brainstorming, provide value to the ideas to creating better society</p>
          </div>
        </Grid>

    </Grid>
      

     );
}

export default OurMission;