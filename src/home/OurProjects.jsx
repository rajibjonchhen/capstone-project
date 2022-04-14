import { Grid } from "@material-ui/core";
import { Container } from "@mui/material";
import CategoryCard from "./CategoryCard";
import "./ourProject.css"

function OurProjects() {
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
        
                <Grid container style={{background:"blue"}}>
                    <Grid item xs={12} md={8} style={{background:"red",margin:"auto", display:"flex",justifyContent:"center"}}>
                        <Grid container >
                            {myCategories.map((category, i) => 
                                <Grid key={i}  item xs={12} md={6} >
                                    <CategoryCard category={category}/> 
                                </Grid>
                            )}
                            </Grid>
                    </Grid>
                </Grid>

     );
}

export default OurProjects;