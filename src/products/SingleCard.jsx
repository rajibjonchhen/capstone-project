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

export default function SingleCard({product}) {
  const navigate = useNavigate()
  const [likesCount, setLikesCount] = useState(100);
  const [like, setLike] = useState(false);
  return (
    <Card sx={{ width: "98%", m: 1 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="140"
        image="https://picsum.photos/200/300"
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product?.summary}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Like</Button>
        <Button size="small" >
          {likesCount}
          <Favorite sx={{ color: pink[500], display:like? "block":"none" }} onClick={() => setLike(false)} />
          <FavoriteBorder
            sx={{ color: pink[500], display:!like? "block":"none"  }}
            onClick={() => setLike(true)}
          />
        </Button>
        <Button size="small"  onClick={() => navigate("/detail")}>Learn More</Button>
      </CardActions>
    </Card>
  );
}
