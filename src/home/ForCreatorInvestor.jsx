import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setRoleAction } from '../redux/actions/action'
import "./forCreatorInvestor.css"
function ForCreatorInvestor() {
    
  const navigate  = useNavigate()
  const roleArray = [{
    title:"Investor",
    type:"investor",
    description:"",
    buttonText:"Join as an Investor"
  },
 {
    title:"creator",
    type:"investor",
    description:"",
    buttonText:"Join as Creator"
  }]
    const dispatch = useDispatch()

  return (
    <Container>
        <Row>
            <Col>
              {roleArray.map((role,i) =>
                <div>
                  <div>
                    <span className="text-for-the">For the</span>
                    <span className="highlight-role">{role.title}</span>
                  </div>
                  <div>
                    {}
                  </div>
                    <Button className="direction-btn" onClick={() => {dispatch(setRoleAction(role.type));navigate("/")} }>{role.buttonText} </Button>
                  </div>
                  )
                }
            </Col>
        </Row>
    </Container>
  )
}

export default ForCreatorInvestor