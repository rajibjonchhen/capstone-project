import { Col, Container, Row } from 'react-bootstrap'
import ForCreatorInvestor from './ForCreatorInvestor.jsx'
import OurMission from './OurMission.jsx'
import "./ourValue.css"
import { ourValueData } from "./ourValueData.js"

function OurValue() {

  return (
        <Container className='py-2'>
            <hr className="mission-box-hr"/>
            <hr className="mission-box-hr"/>
            <h1 className="my-3">Our Mission</h1>
            <hr className="mission-box-hr"/>
            <hr className="mission-box-hr"/>
            <Row>
              <OurMission/>
            </Row>
            <hr className="mission-box-hr"/>
            <hr className="mission-box-hr"/>
            <h1 className="my-3">Value we provide</h1>
            <hr className="mission-box-hr"/>
            <hr className="mission-box-hr"/>
          <Row className="mb-5">
          {ourValueData.map((data,i) => 
          <Col sm={6}>
            <div  style={{display:'flex',borderRadius: "15px", marginTop:"30px", border:"1px solid rgb(187, 186, 186)", borderRadius: "15px", overflow:"hidden", minHeight:"400px"}}>
                  <Col sm={12} md={6} style={{justifyContent:"center", order:i%2 === 0? 1:2, backgroundImage:`url(${data.backgroundImg})`, backgroundPosition:"center", backgroundSize:"cover"}}>

                  {/* <img
                  width="100%"
                  className="inner-box"
                  style={{borderRadius:"15px"}}
                  src={data.backgroundImg}
                  alt="represention of value we provide"
                  /> */}
                  
                  </Col>
                  <Col  sm={12} md={6}  style={{display:'flex', alignItems:"center", justifyContent:"center",  order:i%2 !== 0? 1:2}}>
                      <div className="box-outline">

                      <div className="inner-box" style={{margin:"0 auto", width:"100%", padding:"10px"}}>
                        <div className="small-icons">
                            {data.image}
                        </div>
                      
                        <h3 >{data.title}</h3>
                        <p >{data.description}</p>
                      </div>
                      </div>
                    </Col>
                
                
                
                </div>
                </Col>)}
                </Row>
                <hr className="mission-box-hr"/>
                <hr className="mission-box-hr"/>
                <h1 className="my-3">Our Services</h1>
                <hr className="mission-box-hr"/>
                <hr className="mission-box-hr"/>
                <Row  className="my-5">
                 <Col>
                      <ForCreatorInvestor/>
                 </Col>
                </Row>
            </Container>

  )
}

export default OurValue