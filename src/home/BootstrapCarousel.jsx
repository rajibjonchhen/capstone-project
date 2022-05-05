import React from 'react'
import {Carousel} from 'react-bootstrap'
import {myCarouselData} from "./myCarouselData.js"
import "./myCarousel.css"

function BootstrapCarousel() {
  return (
    <Carousel style={{width:'90%', margin:"auto"}}>
        {myCarouselData.map((data,i) => 
            <Carousel.Item key={i}>
                <img
                className="d-block w-100"
                src={data.backgroundImg}
                alt="First slide"
                />
                <Carousel.Caption className='carousel-text'>
                <div className="small-icons">
                    {data.image}
                </div>
              
                <h3 >{data.title}</h3>
                <p >{data.description}</p>
                
                </Carousel.Caption>
            </Carousel.Item>
            )}
</Carousel>
  )
}

export default BootstrapCarousel