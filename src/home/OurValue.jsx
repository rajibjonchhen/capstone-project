import React from 'react'
import {Carousel, Col, Container, Row} from 'react-bootstrap'
import {myCarouselData} from "./myCarouselData.js"
import "./ourValue.css"

function OurValue() {
  return (
        <Container >
            <h1>Value we provide</h1>
        {myCarouselData.map((data,i) => 
                <Row key={i} style={{display:'flex'}}>
                  <Col className="box-outline" style={{display:'flex',padding:"0", margin:"0", alignItems:"center", justifyContent:"center", order:i%2 === 0? 1:2}}>
                  <img
                  width="100%"
                  className="inner-box"
                  style={{borderRadius:"25px"}}
                  src={data.backgroundImg}
                  alt="First slide"
                  />
                  </Col>
                  <Col className="box-outline"  style={{display:'flex', padding:"0", margin:"0", alignItems:"center", justifyContent:"center",  order:i%2 !== 0? 1:2}}>
                      <div className="inner-box" style={{margin:"0 auto", width:"100%", padding:"10px"}}>
                        <div className="small-icons">
                            {data.image}
                        </div>
                      
                        <h3 >{data.title}</h3>
                        <p >{data.description}</p>
                      </div>
                    </Col>
                
                </Row>
               
               
               )}
               
            </Container>

  )
}

export default OurValue