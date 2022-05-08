import "./categoryCard.css";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import {Card} from "react-bootstrap";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCategoryAction } from "../redux/actions/action";

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const changeCategory = (e, type)=>{
    e.preventDefault()
    dispatch(setSelectedCategoryAction(type));
    console.log(type); 
     navigate(`/products`)
  }
  return (

    //  <Card sx={{ maxWidth: 345 }} className="category-card">
    //   <CardActionArea>
    //     <CardMedia
    //       component="img"
    //       height="140"
    //       image={category?.image}
    //       alt="green iguana"
    //     />
    //     <CardContent
    //      onClick = {(e) => {changeCategory(e, category?.type)}}
    //      style={{ position:'absolute', bottom:"10px"}}
    //     >
    //       <Typography gutterBottom variant="h5" component="div">
    //       {category?.name}
    //       </Typography>
    //       <Typography variant="body2" color="text.secondary">
    //       {category?.description}
    //       </Typography>
    //     </CardContent>
    //   </CardActionArea>
    
    // </Card>

    <Card className="category-card" style={{maxWidth:"200px"}}>
      <CardMedia
        component="img"
        image={category?.image}
        alt="Live from space album cover"
        onClick = {(e) => {changeCategory(e, category?.type)}}
        style={{width:"100%", height:"auto", }}
      />
      <Button
          size="small"
          onClick = {(e) => {changeCategory(e, category?.type)}}
          className="theme-btn"
        >
          Explore
        </Button>
      
        <CardContent
          size="small"
          onClick = {(e) => {changeCategory(e, category?.type)}}
          style={{ bottom:"10px",}}
        >
          <Typography component="div" variant="h6" textAlign="left">
            {category?.name}
          </Typography>
          <Typography textAlign="left"
            component="div"
          >
            {category?.description}
          </Typography>
      
        </CardContent>
      
    
    
    </Card>
    
  );
}
