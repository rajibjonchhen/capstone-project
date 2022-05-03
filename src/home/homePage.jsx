import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import MyJumbotron from "./AboutUs";
import "./homePage.css"
import { Container, Grid } from "@mui/material";
import HowWeHelp from "./HowWeHelp";
import { useNavigate } from "react-router-dom";
import OurProjects from "./OurProjects";
import OurMission from "./OurMission";
import { Business, Group, Support } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import Individual from "../assets/idea.png"
import Investor from "../assets/investor.png"
import Society from "../assets/society.png"
import Sustainable from "../assets/sustainable.png"
import MyFooter from "../footer/myfooter";
import MyNavbar from "../myNavbar/MyNavbar";
import MyCarousel from "./MyCarousel";
import AboutUs from "./AboutUs";
import BootstrapCarousel from "./BootstrapCarousel";

function HomePage() {

   const navigate = useNavigate()
   const informationArray =  [
      {
         title:"Individuals",
         description:"We strive to make it easier for everyone to come up with innovative ideas that can create business and job opportunity  across the world. If you have a good intention to contribute to your favorite cause, we've got you covered.",
         body:"",
         image:<Group className="my-icons"/>,
         backgroundImg:Individual
   },
      {
         title:"Investors",
         description:"We provide business plans and particularized solutions to help investor to find right business/corporate and enable them to invest in their interested field, and support any project across the world.",
         body:"",
         image:<Business className="my-icons"/>,
         backgroundImg:Investor
   },
      {
         title:"Society",
         description:"Any non-profit organization anywhere in the world can join Tom Parker's Giving to create fundraising pages and access tools, training, individual support, and money-seeking with the help of our community.",
         body:"",
         image:<AttachMoneyOutlinedIcon className="my-icons"/>,
         backgroundImg:Society
   },
      {
         title:"Sustainable Development",
         description:"Through our rigorous process, effort and wide network, we provide foundations to sustainable development where innovation can prospher and investors get right opportunity to make the change.",
         body:"",
         image:<Support className="my-icons"/>,
         backgroundImg:Sustainable
   },
]
   
   
    return ( <div>
       <MyNavbar/>
       <BootstrapCarousel/>
       <MyCarousel/>

              {/* {informationArray.map((information, i) => 
                    <div key={i} className="jumbo-box" style={{position:"relative"}}> 
                     <img src={information?.backgroundImg} alt="how we help" style={{width:"100%", }}/>
                        <h1 className="theme-color" style={{margin:"50px auto"}}>How we help</h1>
                           <HowWeHelp information={information}/>
            </div> 
              )} */}
              
              <OurProjects/>
    
           
               <AboutUs/>
      
              <OurMission/>
              <MyFooter/>
              </div>
            
               
     );
}

export default HomePage;