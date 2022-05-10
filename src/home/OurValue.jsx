import React from 'react'
import {Carousel, Col, Container, Row} from 'react-bootstrap'
import {myCarouselData} from "./myCarouselData.js"
import "./ourValue.css"

function OurValue() {
  return (
        <Container className='py-2'>
            <h1 className="my-3">Value we provide</h1>
        {myCarouselData.map((data,i) => 
                <Row key={i} style={{display:'flex'}}>
                  <Col  style={{display:'flex',padding:"0", margin:"0", alignItems:"center", justifyContent:"center", order:i%2 === 0? 1:2}}>
                 <div className="box-outline">

                  <img
                  width="100%"
                  className="inner-box"
                  style={{borderRadius:"25px"}}
                  src={data.backgroundImg}
                  alt="First slide"
                  />
                  </div>
                  </Col>
                  <Col   style={{display:'flex', padding:"0", margin:"0", alignItems:"center", justifyContent:"center",  order:i%2 !== 0? 1:2}}>
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
                
                </Row>
               
               
               )}
               
            </Container>

  )
}

export default OurValue