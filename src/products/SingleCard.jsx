import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { pink } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSingleProductAction } from "../redux/actions/action";
import "./singleCard.css"
import { Alert } from "@mui/material";

export default function SingleCard({product}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [likesCount, setLikesCount] = useState(null);
  const [isLiked, setIsLiked] = useState(false)
  const [error, setError] = useState("")


  React.useEffect(() => {
    console.log(product.isLiked)
    setIsLiked(product.isLiked)
  }, [])
  const handleLikes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/products/${product._id}/likes`,
        {
          method: "PUT",
          headers: {
            authorization: localStorage.getItem("MyToken"),
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
      } else {
        const data = await response.json();
        console.log(data);
        setIsLiked(data.product.isLiked)
        setLikesCount(data.product.Likes.length)

      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Card className="single-product-card" sx={{ width: "98%",maxWidth:"360px", minHeight:"300px", m: 1 }}>
      {error && <Alert>{error}</Alert> }
      <CardMedia
        component="img"
        alt= {product?.title}
        height="140"
        image={product?.images[0] || "https://res.cloudinary.com/dai5duzoj/image/upload/v1649986446/creators-space-products/lw8f79wcrzpqa4eqeane.png"}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.summary}
        </Typography>
      </CardContent>
      <CardActions sx={{marginBottom:"0"}}>
        <Button size="small">Like</Button>
        <Button size="small" >
          {likesCount}
          <Favorite sx={{ color: pink[500], display:isLiked? "block":"none" }} onClick={() => handleLikes()} />
          <FavoriteBorder
            sx={{ color: pink[500], display:!isLiked? "block":"none"  }}
            onClick={() => handleLikes()} 
          />
        </Button>
        <Button size="small"  onClick={() =>{dispatch(setSingleProductAction(product)); navigate(`/detail/${product?._id}`)}}>Learn More</Button>
      </CardActions>
       
    </Card>
  );
}
