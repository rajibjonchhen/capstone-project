import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import MyJumbotron from "./MyJumbotron";
import "./homePage.css"
import { Container, Grid } from "@mui/material";
import HowWeHelp from "./HowWeHelp";
import { useNavigate } from "react-router-dom";
import OurProjects from "./OurProjects";
import OurMission from "./OurMission";

function HomePage() {

   const navigate = useNavigate()
   
   
   
    return ( 
        <div> 
               <MyJumbotron/>
        
           
             
              <OurMission/>
           
           
              <h2>Our Projects</h2>
              <OurProjects/>
    
              <h2>How we help</h2>
                <HowWeHelp/>
           
            
               
        </div>
     );
}

export default HomePage;