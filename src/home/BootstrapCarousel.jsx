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
                <Carousel.Caption style={{backgroundColor:"rgb(99,173,203,0.8)", borderRadius:"60px"}}>
                <div className="small-icons">
                    {data.image}
                </div>
                <h3 className='mt-2'>{data.title}</h3>
                <p className="px-2">{data.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            )}
</Carousel>
  )
}

export default BootstrapCarousel