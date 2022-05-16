

import { ArrowBackIosRounded, ArrowForwardIosRounded } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { useState } from 'react'
import { myCarouselData } from "../home/ourValueData.js/index.js.js"
import "./myCarousel.css"


function MyCarousel() {
    const[index, setIndex] = useState(0)

    const handlePrev = (value) => {
        if(index === 0){
            setIndex(myCarouselData.length-1)
        } else{
            setIndex(index+value)
        }
    }

    const handleNext = (value) => {
        if(index === myCarouselData.length-1){
            setIndex(0)
        } else{
            setIndex(index+value)
        }
    }

  return (
    <div className="carousel">

            <div className="carousel-item" style={{backgroundImage:`url(${myCarouselData[index].backgroundImg})`}}>
            <div className="left">
                <IconButton   onClick={() => handlePrev(-1)}>
                    <ArrowBackIosRounded className="arrow"/>
                </IconButton>
            </div>
            
            <div className="center">
                <div>
                    <div className="small-icons">
                        {myCarouselData[index]?.image}
                    </div>
                    <h3>{myCarouselData[index].title}</h3>
                    <p>{myCarouselData[index].description}</p>
                </div>
                
            </div>
            <div className="right" >
                <IconButton onClick={() => handleNext(1)}>
            
                    <ArrowForwardIosRounded className="arrow"/>
            
                </IconButton>
            </div>
            
        </div>
    </div>
    )
    }

export default MyCarousel
// import React from 'react';
// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@mui/material'
// import { Box } from '@material-ui/core';


// function Item(props)
// {
//     return (
//         <Paper>
//             <h2>{props.item.name}</h2>
//             <p>{props.item.description}</p>

//             <Button className="CheckButton">
//                 Check it out!
//             </Button>
//         </Paper>
//     )
// }
// function MyCarousel(props)
// {
//     var items = [
//         {
//             name: "Random Name #1",
//             description: "Probably the most random thing you have ever seen!"
//         },
//         {
//             name: "Random Name #2",
//             description: "Hello World!"
//         }
//     ]

//     return (
//         <Carousel>
//             {
//                 items.map( (item, i) =>  <Item key={i} item={item} /> )
//             }
//         </Carousel>
//     )
// }





// export default MyCarousel


