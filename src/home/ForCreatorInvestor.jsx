import { MonetizationOn, Person } from '@mui/icons-material'
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
    description:"Investors play a major and vital role in the success and growth of a company. This is where the our investor relations department comes into play. We showcase the ideas as business plans, arts, musics and literatures. We help you to connect with the creativity and creator. So that you can support the ideas and people that evovle from the society",
    services:[
      "Oppurtinity to contribute to creativity in the society",
      "Opportunity to get the first hand ideas and creations",
      "Providing non-financial data for you to evaluate",
      "Detailed feasibility study of a project can be requested",
    
    ],
    buttonText:"Join as an Investor",
    icon:<MonetizationOn style={{fontSize:"40px"}}/>
  },
 {
    title:"Creator",
    type:"creator",
    description:"Creative minds run wild and come up with innovative ideas. We give these people a little help by encouraging the right mindset to take hold and allowing them to pitch their creations through showcasing in our platform we also provide trainings and supports that help you to progress and become professional on what you do",
    services:[
      "Set the stage for brainstorming",
      "Inspire individuals to take risks with their ideas.",
      "Give feedback on each idea and help them improve it.",
      "Showcase creativity as often as possible.",
    ],
    buttonText:"Join as Creator",
    icon:<Person style={{fontSize:"40px"}}/>

  }]
    const dispatch = useDispatch()

  return (<>    
    <Container  className="role-box p-3"> 
          <Row  className="d-flex">
    {roleArray.map((role,i) =>
            <Col key={i} sm={12} md={6} style={{ order: i===0? 1:2, margin:"20px auto"}} >
              <p className=" mr-auto"><span className="text-white text-for-the ">For the</span> <span className="highlight-role ml-auto">{role.title} {role.icon}</span></p>
              
               {/* 
                     <div className="role-title-card">
                       <div className="d-flex flex-column align-items-center justify-content-center w-100">
                         
                       </div>
                     </div>
                    */}
                  {/* </Col> 
                  <Col className="h-100" style={{order: i===0? 2:1}}> */}
                      <div style={{height:'100%',margin:"auto"}}>
                          <div style={{margin:"auto"}}>
                            <p className="role-description">{role.description}</p>
                            <ul className=" text-left">
                              {role.services.map((service,i) => <li key={i}>{service}</li>)}
                            </ul>
                          </div>
                          <Button className="direction-btn" onClick={() => {dispatch(setRoleAction(role.type));navigate(`/?role=${role.type}`)} }>{role.buttonText} </Button>
                      </div>
                    </Col>
          )
        }
          </Row>
        </Container>
  </>
)
}

export default ForCreatorInvestor