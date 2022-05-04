import { Grid } from "@material-ui/core";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import CategoryCard from "./CategoryCard";
import "./ourProject.css"

function OurProjects() {

const [ showCard, setShowCard] = useState([false, false, false, false])


    const myCategories = [
        { name : "Innovative Ideas",
            image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688009/creators-space-products/smgag3ddsut8rha928xu.png",
            description : "collaborate with the investor",
            type:"idea"
    },
         
        
        { name : "Novels",
            image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688011/creators-space-products/gptlibei9aykwy6f9sea.png",
            description : "collaborate with the publisher",
            type: "novel",
    },
        { name : "Poem",
            image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688013/creators-space-products/fzdw29oezlqn0pmozqot.png",
            description : "collaborate with the publisher",
            type :"poem",
    },
        { name : "Song",
            image :    "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688014/creators-space-products/vkswpt8nnmpznufocdni.png",
            description : "collaborate with the singer",
            type :"song",
    },
        { name : "Web Template",
            image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688015/creators-space-products/hvdci6ohvnuyfupgr9go.png",
            description : "collaborate with the business & individual ",
            type :"web template"
    },
        { name : "Movie",
            image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688012/creators-space-products/sg2c0jpxz9ha1phy4on7.png",
            description : "collaborate with the movie producer",
            type : "movie",
    },
    ]
    return ( 
    <Container   fluid className="our-projects">        
        <h1 style={{margin:"50px auto", color:"white"}}>Our Projects</h1>
        <Row className="project-container row-cols-1 row-cols-sm-2  row-cols-md-3 row-cols-lg-4"> 

            {myCategories.map((category, i) => 
               <div style={{opacity: "1"}}>
                    <CategoryCard  category={category}/> 
               </div>
               
        )}
        </Row>

        
    </Container>
);
}

export default OurProjects;