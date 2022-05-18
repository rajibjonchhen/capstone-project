import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ForCreatorInvestor from "./ForCreatorInvestor";
import "./homePage.css";
import MyJumbotron from "./MyJumbotron";
import OurProjects from "./OurProjects";
import WhoWeAre from "./WhoWeAre";

function HomePage() {

   const navigate = useNavigate()
   
   
   
    return ( <div>
              <MyJumbotron/>
               
               <OurProjects/>
               
               <WhoWeAre/>
               
               <ForCreatorInvestor role="creator"/>
               
              </div>
            
               
     );
}

export default HomePage;