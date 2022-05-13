import { MonetizationOn, MonetizationOnOutlined, Person } from '@mui/icons-material'
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
    
    ],
    buttonText:"Join as an Investor",
    icon:<MonetizationOn style={{fontSize:"40px"}}/>
  },
 {
    title:"Creator",
    type:"creator",
    description:"",
    services:[
      "",
      ""
    ],
    buttonText:"Join as Creator",
    icon:<Person style={{fontSize:"40px"}}/>

  }]
    const dispatch = useDispatch()

  return (<>    
    {roleArray.map((role,i) =>
    <Container key={i} className="role-box p-3 mt-5"> 
          <Row  className="d-flex">
               <Col style={{backgroundColor :  "rgb(17,72,95)", order: i===0? 1:2, margin:"0 20px"}} >
                     <div className="role-title-card">
                          
                              <div className="d-flex flex-column">
                                 <span className="text-for-the">For the</span>
                                 <p  className="highlight-role">
                                    <span>{role.title}</span>
                                    <span>{role.icon}</span>
                                 </p>
                              </div>
                          
                           
                     </div>
                  </Col>
                  <Col className="h-100" style={{order: i===0? 2:1}}>
                      <div >
                        <div>
                        <p className="h4">{role.description}</p>
                        <ul>
                          {role.services.map((service,i) => <li key={i}>{service}</li>)}
                        </ul>
                        </div>
                          <Button className="direction-btn" onClick={() => {dispatch(setRoleAction(role.type));navigate(`/?role=${role.type}`)} }>{role.buttonText} </Button>
                        </div>
                    </Col>
          </Row>
        </Container>
                  )
                }
  </>
)
}

export default ForCreatorInvestor