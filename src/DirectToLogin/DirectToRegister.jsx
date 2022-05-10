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
        <Col >
          <div className="direct-to-register">
            <img src={AGirlThinking} alt="a girl thinking" width="100%" />
          </div>
        </Col>
        <Col className="direct-to-register">
          <div>

        <h1 >
            Please register to use the service
        </h1>
       
            <Button variant="warning" style={{width:"300px", fontSize:"2rem"}} onClick={() => navigate("/")}>Register now</Button>
          </div>
        </Col>
      </Row>

    </Container>
  )
}

export default DirectToRegister