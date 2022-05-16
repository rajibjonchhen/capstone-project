import { Grid } from "@material-ui/core";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import "./ourProject.css"
import songs from "../assets/songs.jpg"
import poems from "../assets/poems.jpg"
import movies from "../assets/movies.jpg"
import novels from "../assets/novels.jpg"
import webTemplate from "../assets/web template.jpg"
import paintings from "../assets/paintings.jpg"
import ideas from "../assets/ideas.jpg"
import { useScroll } from "react-use-gesture";
import { animated, useSpring } from "react-spring";


function OurProjects() {

const [ showCard, setShowCard] = useState([false, false, false, false])



const [style, set] = useSpring(() => ({
    transform: "perspective(500px) rotateY(0deg)"
  }));
const bind = useScroll(event => {
    set({
      transform: `perspective(500px) rotateY(${
        event.scrolling ? event.delta[0] : 0
      }deg)`
    });
  });


    const myCategories = [
        { name :"Ideas",
            image : ideas,
            description : "collaborate with the investor",
            type:"idea"
    },
         
        
        { name : "Novels",
            image : novels,
            description : "collaborate with the publisher",
            type: "novel",
    },
        { name : "Poem",
            image : poems,
            description : "collaborate with the publisher",
            type :"poem",
    },
        { name : "Songs",
            image :    songs,
            description : "collaborate with the singer",
            type :"song",
    },
        { name : "Web Template",
            image : webTemplate,
            description : "collaborate with the business & individual ",
            type :"web template"
    },
        { name : "Movie",
            image : movies,
            description : "collaborate with the movie producer",
            type : "movie",
    },
        { name : "Painting",
            image : paintings,
            description : "collaborate with the producer",
            type : "painting",
    },
    ]
    return ( 
    <Container   fluid className="our-projects">        
        
        
            <Row className="project-container row-cols-1 row-cols-sm-2  row-cols-md-3 row-cols-lg-5 p-5" 
                style={{display:"flex", flexWrap:"nowrap", overflowX:"scroll", overflowY:"hidden", 
               }} {...bind()}> 
                <Col style={{display:"flex", justifyContent:"center", alignItems:"center",position:"relative"}}>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"absolute", }}>
                    <ArrowBackIos className="text-white pointer" style={{  right:0}}/>
                    <h1 style={{margin:"30px auto", color:"white",transform: "rotate(270deg)"}}>Our Projects</h1>
                    </div>
                </Col>
            

            {myCategories.map((category, i) => 
               <Col key={i} style={{opacity: "1",padding:"5px"}}>
                    <CategoryCard  key={i}  category={category}/> 
               </Col>
               
        )}
            <Col style={{display:"flex", justifyContent:"center", alignItems:"center",position:"relative"}}>
                    <ArrowForwardIos className="text-white pointer" style={{  right:0}}/>
            </Col>
        </Row>

        
    </Container>
);
}

export default OurProjects;