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

export default function CategoryCard({ category }) {
  const navigate = useNavigate();
  return (
    <Card sx={{ display: "flex", maxWidth: 360, margin: "10px auto" }}>
      <CardMedia
        component="img"
        sx={{ width: 150, maxHeight: 150 }}
        image={category?.image}
        alt="Live from space album cover"
        onClick={() => {
          navigate("/products");
        }}
      />
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent
          sx={{ flex: "1 0 auto" }}
          onClick={() => {
            navigate("/products");
          }}
        >
          <Typography component="div" variant="h6" textAlign="left">
            {category?.name}
          </Typography>
          <Typography
            color="text.secondary"
            component="div"
          >
            {category?.description}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          <Button
            variant="outlined"
            size="small"
            startIcon={<TravelExploreOutlinedIcon />}
          >
            Explore
          </Button>
        </Box>
      </Box>
    </Card>
  );
}
