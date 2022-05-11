import { Container } from "@material-ui/core";
import { Business, Group, Support } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Individual from "../assets/idea.png";
import Investor from "../assets/investor.png";
import Society from "../assets/society.png";
import Sustainable from "../assets/sustainable.png";
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
               
               <Container>
                  <Row>
                     <Col>
      
                     x<WhoWeAre/>

                     <ForCreatorInvestor role="creator"/>
                     </Col>
                  </Row>
               </Container>
               
              </div>
            
               
     );
}

export default HomePage;