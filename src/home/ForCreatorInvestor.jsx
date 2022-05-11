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
    description:"Investors play a major and vital role in the success and growth of a company. This is where the our investor relations department comes into play.",
    services:[
      "Providing non-financial data for you to evaluate",
      "",
      "",
      "",
    ],
    buttonText:"Join as an Investor",
  },
 {
    title:"Creator",
    type:"investor",
    description:"",
    services:[
      "",
      ""
    ],
    buttonText:"Join as Creator"
  }]
    const dispatch = useDispatch()

  return (
    <Container fluid>
        <Row>
         
            <Col>
              {roleArray.map((role,i) =>
                <div>
                  {/* <div className="d-flex flex-column">
                    <span className="text-for-the">For the</span>
                    <span className="highlight-role">{role.title}</span>
                  </div> */}
                  <div>
                   <p>{role.description}</p>
                   <ul>
                     {role.services.map((service,i) => <li key={i}>{service}</li>)}
                   </ul>
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