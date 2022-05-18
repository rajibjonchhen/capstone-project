import { pink } from "@material-ui/core/colors";
import { Delete, DeleteOutline, Favorite, FavoriteBorder } from "@mui/icons-material";
import { Alert, IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setMyInfoAction, setSingleProductAction } from "../redux/actions/action";
import MyVerticallyCenteredModal from "./DeleteConfirmation";
import DeleteConfirmation from "./DeleteConfirmation";
import "./singleCard.css";

export default function SingleCard({ product, fetchMyProducts }) {
  const [show, setShow] = useState(false);
  const [modalShow, setModalShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [openDeleteConfirm, setOpenDeleteConfirm] = useState(false);
  const [likes, setLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [error, setError] = useState("");

  const myInfo = useSelector((state) => state.user.myInfo);

  useEffect(() => {
    // console.log(product?.creator, "product?.creator._id === myInfo?._id");
    // console.log(product?.isLiked)
    setIsLiked(product.isLiked);
  }, []);


 

  const handleLikes = async () => {
    // setIsLiked(!product.isLiked)
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
        setTimeout(() => setError(""), 400);
      } else {
        const data = await response.json();
        console.log(data);
        setIsLiked(data.product.isLiked);
        setLikes(data.product.Likes);
        setTimeout(() => setError(""), 400);
        dispatch(setMyInfoAction(data.user))
      }
    } catch (error) {
      console.log(error);
      setError(error);
      setTimeout(() => setError(""), 400);
    }
  };

  React.useEffect(() => {}, []);
  return (
    <Card
      className="single-product-card"
      sx={{ width: "100%", height: "300px", position: "relative" }}
    >
      {error && <Alert>{error}</Alert>}
      <CardMedia
        component="img"
        alt={product?.title}
        height="140"
        image={
          product?.images[0] ||
          "https://res.cloudinary.com/dai5duzoj/image/upload/v1649986446/creators-space-products/lw8f79wcrzpqa4eqeane.png"
        }
      />
      <CardContent>
        <Typography
          gutterBottom
          variant="h6"
          component="div"
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {product?.title}
        </Typography>
        <Typography className="text-wrap">{product?.summary}</Typography>
        <Button
          size="small"
          className="theme-btn"
          onClick={() => {
            dispatch(setSingleProductAction(product));
            navigate(`/detail/${product?._id}`);
          }}
        >
          Learn More
        </Button>
        <div
          style={{
            bottom: "5px",
            position: "absolute",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "end",
            width:"100%"
          }}
        >
          <div>
            <Button
              size="small"
              style={{
                width: "150px",
                display: "flex",
                justifyContent: "flex-start",
              }}
              onClick={() => {
                if (myInfo) {
                  handleLikes();
                } else {
                  navigate("/direct");
                }
              }}
            >
              <Favorite
                sx={{
                  color: pink[500],
                  display: isLiked ? "block" : "none",
                  width: "25px",
                  marginLeft: "5px",
                }}
              />
              <FavoriteBorder
                sx={{
                  color: pink[500],
                  display: !isLiked ? "block" : "none",
                  width: "25px",
                  marginLeft: "5px",
                }}
              />
              <span style={{ fontSize: "10px", textAlign: "left" }}>
                {isLiked
                  ? `You and ${product?.Likes.length} other`
                  : `${product?.Likes.length}`}
              </span>
            </Button>
          </div>
         

          
        </div>
      </CardContent>
    </Card>
  );
}
