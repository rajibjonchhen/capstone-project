import { Grid } from "@material-ui/core";
import { Button, Container } from "@mui/material";
import "./jumbotron.css"

function MyJumbotron() {
    return ( 

      <Grid container style={{background:"blue"}}>
      <Grid item xs={12} md={8} style={{background:"red",margin:"auto", display:"flex",justifyContent:"center"}}>
          
                      
                  <Grid container className="jumbotron" >
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
                  </Grid>
            
              </Grid>
      

     );
}

export default MyJumbotron;