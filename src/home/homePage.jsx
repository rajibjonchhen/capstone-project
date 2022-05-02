import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import MyJumbotron from "./MyJumbotron";
import "./homePage.css"
import { Container, Grid } from "@mui/material";
import HowWeHelp from "./HowWeHelp";
import { useNavigate } from "react-router-dom";
import OurProjects from "./OurProjects";
import OurMission from "./OurMission";
import { Business, Group, Support } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';

function HomePage() {

   const navigate = useNavigate()
   const informationArray =  [
      {
         title:"Individuals",
         description:"We strive to make it easier for everyone to come up with innovative ideas that can create business and job opportunity  across the world. If you have a good intention to contribute to your favorite cause, we've got you covered.",
         body:"",
         image:<Group className="my-icons"/>
   },
      {
         title:"Investors",
         description:"We provide business plans and particularized solutions to help investor to find right business/corporate and enable them to invest in their interested field, and support any project across the world.",
         body:"",
         image:<Business className="my-icons"/>
   },
      {
         title:"Society",
         description:"Any non-profit organization anywhere in the world can join Tom Parker's Giving to create fundraising pages and access tools, training, individual support, and money-seeking with the help of our community.",
         body:"",
         image:<AttachMoneyOutlinedIcon className="my-icons"/>
   },
      {
         title:"Support",
         description:"Through our rigorous review process and wide network, we provide foundations with the opportunity to send gifts to local nonprofit organizations around the world that would be too small for conventional grant processes.",
         body:"",
         image:<Support className="my-icons"/>
   },
]
   
   
    return ( 
        <div> 
               <MyJumbotron/>
      
              <OurMission/>
           
           
              
              <OurProjects/>
    
              <h1 className="theme-color" style={{margin:"50px auto"}}>How we help</h1>
              <Grid container style={{margin:"0px auto 50px"}}>
              {informationArray.map((information, i) => <Grid key={i} xs={12} md={6}  item>
                <HowWeHelp information={information}/>
              </Grid>)}
              </Grid>
           
            
               
        </div>
     );
}

export default HomePage;