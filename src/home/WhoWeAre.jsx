import { Grid } from "@material-ui/core";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./whoWeAre.css";

function WhoWeAre() {

  useEffect(() =>{
    
  },[])
    return ( 

      <Container >
             <p className="h1 my-5">Who we are?</p>         
          <Row container className="about-us" >
            <Col item  xs={12} md={6}>
            <p>
               An idea can change the the world and
              together we can make a big difference in the society       
            </p>
            </Col>
            <Col item xs={12} md={6}>
              <img  src="https://blog.bonus.ly/hs-fs/hubfs/team-putting-together-puzzle-01.png?width=1200&name=team-putting-together-puzzle-01.png" />
            </Col>
          </Row>
                 
      </Container>
      

     );
}

export default WhoWeAre;