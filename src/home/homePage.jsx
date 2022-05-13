import { Business, Group, Support } from "@mui/icons-material";
import AttachMoneyOutlinedIcon from '@mui/icons-material/AttachMoneyOutlined';
import { Col, Container, Row } from "react-bootstrap";
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
               
                     <WhoWeAre/>
               <Container >
                  <Row>
                     <Col>
                     </Col>
                  </Row>
                  <Row>
                     
                     <Col>
                     </Col>
                  </Row>
               </Container>
                        <ForCreatorInvestor role="creator"/>
               
              </div>
            
               
     );
}

export default HomePage;