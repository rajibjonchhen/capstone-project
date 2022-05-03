import React from 'react'
import {Carousel} from 'react-bootstrap'
import {myCarouselData} from "./myCarouselData.js"
import "./myCarousel.css"

function BootstrapCarousel() {
  return (
    <Carousel>
        {myCarouselData.map((data,i) => 
            <Carousel.Item>
                <img
                className="d-block w-100"
                src={data.backgroundImg}
                alt="First slide"
                />
                <Carousel.Caption style={{backgroundColor:"rgb(99,173,203,0.7)"}}>
                <div>
                    {data.image}
                </div>
                <h3>{data.title}</h3>
                <p>{data.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            )}
</Carousel>
  )
}

export default BootstrapCarousel