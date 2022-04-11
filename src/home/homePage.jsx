import { useEffect } from "react";
import CategoryCard from "./CategoryCard";
import MyJumbotron from "./MyJumbotron";
import "./homePage.css"
import { Grid } from "@mui/material";
import HowWeHelp from "./HowWeHelp";
import { useNavigate } from "react-router-dom";

function HomePage() {

   const navigate = useNavigate()
   
   
   
   
   
   
   const myCategories = [
      { name : "Innovative Ideas",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688009/creators-space-products/smgag3ddsut8rha928xu.png",
          description : "for innovative business"
  },
     
      
      { name : "Novels",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688011/creators-space-products/gptlibei9aykwy6f9sea.png",
          description : "for the publishers"
  },
      { name : "Painting",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688012/creators-space-products/v9s2fn5yxjvp3lopru7l.png",
          description : "for the inspiration"
  },
      { name : "Poem",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688013/creators-space-products/fzdw29oezlqn0pmozqot.png",
          description : "for love of your life"
  },
      { name : "Song",
          image :    "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688014/creators-space-products/vkswpt8nnmpznufocdni.png",
          description : "for your life"
  },
      { name : "Web Template",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688015/creators-space-products/hvdci6ohvnuyfupgr9go.png",
          description : "for your business "
  },
      { name : "Story",
          image : "https://res.cloudinary.com/dai5duzoj/image/upload/v1649688012/creators-space-products/sg2c0jpxz9ha1phy4on7.png",
          description : "for your movie"
  },
  ]
   
   
    return ( 
        <div> 
           <div>
               <MyJumbotron/>
           </div>
           <div className="mission-box">
              <h3>Our Mission</h3>
              <p> 
               Set the environment for brainstorming, provide value to the ideas to creating better society</p>
           </div>
           <div className="categories-box pointer">
              <h2>Our Projects</h2>
              <Grid container alignItems="center">
                  {myCategories.map(category => 
                   <Grid item xs={12} sm={12} md={6} lg={6} >
                     <CategoryCard category={category}/> 
                  </Grid>)}
              </Grid>
              
           </div>
               <div>
               <Grid container alignItems="center">
               <Grid item xs={12} sm={12} md={6} lg={6} >
                  <HowWeHelp/>
               </Grid>
               </Grid>
               </div>
               
        </div>
     );
}

export default HomePage;