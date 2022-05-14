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
    icon:<MonetizationOn style={{fontSize:"60px"}}/>
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
    icon:<Person style={{fontSize:"60px"}}/>

  }]
    const dispatch = useDispatch()

  return (<>    
    {roleArray.map((role,i) =>
    <Container key={i} className="role-box p-3"> 
          <Row  className="d-flex">
               <Col style={{ order: i===0? 1:2, margin:"20px"}} >
                     <div className="role-title-card">
                       <div className="d-flex flex-column align-items-center justify-content-center w-100">
                          <p className="highlight-role text-white mr-auto">For the</p>
                          <p className="highlight-role ml-auto">{role.title} {role.icon}</p>
                         
                       </div>
                     </div>
                  </Col>
                  <Col className="h-100" style={{order: i===0? 2:1}}>
                      <div style={{height:'100%'}}>
                          <div>
                          <p >{role.description}</p>
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