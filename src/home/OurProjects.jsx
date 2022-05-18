import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import ideas from "../assets/ideas.jpg";
import movies from "../assets/movies.jpg";
import novels from "../assets/novels.jpg";
import paintings from "../assets/paintings.jpg";
import poems from "../assets/poems.jpg";
import songs from "../assets/songs.jpg";
import webTemplate from "../assets/web template.jpg";
import CategoryCard from "./CategoryCard";
import "./ourProject.css";


function OurProjects() {

const [ showCard, setShowCard] = useState([false, false, false, false])



  const [scroll, setScroll] = useState(false)
  

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
               }} > 
                <Col style={{display:"flex", justifyContent:"center", alignItems:"center",position:"relative", scrollLeft:"scrollLeft"}}>
                    <div style={{ display:"flex", justifyContent:"center", alignItems:"center", position:"absolute",scroll }}>
                        <a href="#category5">

                            <ArrowBackIos className="text-white pointer" style={{  right:0}} onClick={() => { setScroll(true)} }/>
                        </a>
                       
                    <h1 style={{margin:"30px auto", color:"white",transform: "rotate(270deg)"}}>Our Projects</h1>
                    </div>
                </Col>
            

            {myCategories.map((category, i) => 
               <Col key={i} style={{opacity: "1",padding:"5px"}}>
                   <div classsName="card">
                    <CategoryCard  key={i}  i={i} category={category}/> 
                   </div>
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