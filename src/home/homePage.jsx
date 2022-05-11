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
               
               <Container >
                  <Row>
                     <WhoWeAre/>
                  </Row>
                  <Row>
                     <Col >
                     <div className="d-flex flex-column justify-content-between  ">
                           <div className="bg-dark ">
                              <div className="d-flex flex-column">
                                 <span className="text-for-the">For the</span>
                                 <span className="highlight-role">Creator</span>
                              </div>
                           </div>
                           <div className="bg-primary py-5" style={{width:"5px", alignSelf:"stretch", margin:"auto"}}>
                           </div>
                           
                           <div className="bg-dark">
                              <div className="d-flex flex-column">
                                 <span className="text-for-the">For the</span>
                                 <span className="highlight-role">Investor</span>
                              </div>
                           </div>
                     </div>
                  </Col>
                     <Col>
                        <ForCreatorInvestor role="creator"/>
                     </Col>
                  </Row>
               </Container>
               
              </div>
            
               
     );
}

export default HomePage;