import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import MyJumbotron from "./MyJumbotron";
import "./homePage.css"
import { Container, Grid } from "@mui/material";
import HowWeHelp from "./HowWeHelp";
import { useNavigate } from "react-router-dom";
import OurProjects from "./OurProjects";

function HomePage() {

   const navigate = useNavigate()
   
   
   
    return ( 
        <div> 
           <div>
               <MyJumbotron/>
           </div>
           <Container className="mission-box">
              <h3>Our Mission</h3>
              <p> 
               Set the environment for brainstorming, provide value to the ideas to creating better society</p>
           </Container>
           <Container>
              <h2>Our Projects</h2>
              <OurProjects/>
           </Container>
               <div>
               <Grid container alignItems="center">
               <Grid item xs={12} sm={12} md={6} lg={6} >
                  <HowWeHelp/>
               </Grid>
               </Grid>
               </div>
               
        </div>
     );
}

export default HomePage;