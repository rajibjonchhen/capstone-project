import React from 'react'
import { Button, Col } from 'react-bootstrap';

function CategoriesBtns({selectedCategory, changeCategory}) {

    const categoryArray = [
        { title: "All Products", type: "all" },
        { title: "Ideas", type: "idea" },
        { title: "Novels", type: "novel" },
        { title: "Poems", type: "poem" },
        { title: "Songs", type: "song" },
        { title: "Web Template", type: "web template" },
        { title: "Movies", type: "movie" },
        { title: "Paintings", type: "painting"}
      ];
  return (
    <>
        {categoryArray.map((category, i) => (
          <Col key={i}  className="p-0 m-0">
              
                <Button
                
                key={i}
                size="large"
                style={{ width: "140px",border:"none", boxShadow:"none", height:"50px",color:"white", backgroundColor: selectedCategory !== category.type? "rgb(4,52,71)":"rgb(6, 98, 134) " }}
                name={category.type}
                onClick={(e) => {
                  changeCategory(category.type);
                }}>
                  {category.title}
                </Button>    
              
            </Col>
            ))}
    </>
  )
}

export default CategoriesBtns