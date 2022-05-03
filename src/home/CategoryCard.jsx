import "./categoryCard.css";
import TravelExploreOutlinedIcon from "@mui/icons-material/TravelExploreOutlined";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button } from "@material-ui/core";
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
     navigate(`/products/${type}`)
  }
  return (
    
    <Card className="category-card">
      <CardMedia
        component="img"
        image={category?.image}
        alt="Live from space album cover"
        onClick = {(e) => {changeCategory(e, category?.type)}}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto" }}
          onClick={() => {
           ;
          }}
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
          <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            size="small"
            onClick = {(e) => {changeCategory(e, category?.type)}}
            className="theme-btn"
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Card>
    
  );
}
