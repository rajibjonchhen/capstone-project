import { Button } from 'react-bootstrap'
import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./directToRegister.css"
import { useNavigate } from 'react-router-dom'
import AGirlThinking from "../assets/think.png"
import { useDispatch } from 'react-redux'
import { setRoleAction } from '../redux/actions/action'
import { Lightbulb, MonetizationOn } from '@mui/icons-material'
function DirectToRegister() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  return (
    <Container >
      <Row>
        <Col sm={12} md={6}>
          <div className="direct-to-register">
            <img src={AGirlThinking} alt="a girl thinking" width="100%" />
          </div>
        </Col>
        <Col sm={12} md={6} className="direct-to-register">
          <div>

        <h1 >
            Please register to use the service
        </h1>
       <div className="d-flex">
            <Button className="direct-btn" onClick={() => {dispatch(setRoleAction("creator")); navigate("/?role=creator")}}>Become a Creator <Lightbulb/></Button>
            <Button className="direct-btn" onClick={() => {dispatch(setRoleAction("investor")); navigate("/?role=investor")}}>Become an Investor <MonetizationOn/> </Button>
       </div>
          </div>
        </Col>
      </Row>

    </Container>
  )
}

export default DirectToRegister