import { Button } from 'react-bootstrap'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./directToRegister.css"
import { useNavigate } from 'react-router-dom'
import AGirlThinking from "../assets/think.png"
function DirectToRegister() {

  const navigate = useNavigate()
  return (
    <Container >
      <Row>
        <Col className="direct-to-register">
          <div></div>
          <img src={AGirlThinking} alt="a girl thinking" width="300px"/>
        </Col>
        <Col className="direct-to-register">
        <h3 >
            Please register to use the service
        </h3>
        <h2 className="now">Now</h2>
        <Button variant="warning" style={{width:"300px"}} onClick={() => navigate("/")}>Register</Button>
        </Col>
      </Row>

    </Container>
  )
}

export default DirectToRegister