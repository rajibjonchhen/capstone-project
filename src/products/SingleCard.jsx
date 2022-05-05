import * as React from "react";
import { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { DeleteForeverOutlined, Favorite, FavoriteBorder, ThumbUp } from "@mui/icons-material";
import { pink } from "@material-ui/core/colors";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setSingleProductAction } from "../redux/actions/action";
import "./singleCard.css"
import { Alert, IconButton } from "@mui/material";
import { Box } from "@material-ui/core";


export default function SingleCard({product}) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false)
  const [error, setError] = useState("")

const myInfo = useSelector(state => state.user.myInfo)

  React.useEffect(() => {

    console.log(product?.creator, myInfo,"product?.creator._id === myInfo?._id")
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
        setLikes(data.product.Likes)
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/products/${product._id}`,
        {
          method: "DELETE",
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
        setLikes(data.product.Likes)
      }
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {},[])
  return (
    <Card className="single-product-card" sx={{ width: "98%",maxWidth:"360px", minHeight:"300px", m: 1, position:"relative" }}>
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
        <Typography className="text-wrap">
          {product?.summary}
        </Typography>
      <div style={{bottom:"5px",position:"absolute", display:"flex", justifyContent:'space-between',alignItems:"end" }}>
        <div>
          <div >
          <ThumbUp style={{width:"8px"}}/> <span style={{fontSize:"8px"}}>{isLiked? `You and ${product?.Likes.length}`:`${product?.Likes.length}`}</span>
          </div>
            <Button size="small" onClick={() => handleLikes()} >Like 
              <Favorite sx={{ color: pink[500], display:isLiked? "block":"none", width:"15px",marginLeft:"5px" }}  />
              <FavoriteBorder
                sx={{ color: pink[500], display:!isLiked? "block":"none",width:"15px",marginLeft:"5px" }}
                />
              </Button>
            
        </div>
          <Button size="small" className="theme-btn" onClick={() =>{dispatch(setSingleProductAction(product)); navigate(`/detail/${product?._id}`)}}>Learn More</Button>
          {product?.creator?._id === myInfo?._id && <IconButton onClick={() => handleDelete(product?._id)}>
            <DeleteForeverOutlined/>
          </IconButton>}
       
      </div>
                </CardContent>
       
    </Card>
  );
}
