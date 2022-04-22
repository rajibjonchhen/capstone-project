import * as React from "react";
import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, Box, TextField } from "@mui/material";
import "./singlePost.css";
import { Button } from "@material-ui/core";
import { useSelector } from "react-redux";
import { MoreVertRounded } from "@mui/icons-material";

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function SinglePost({ post, fetchPosts }) {

  const [expanded, setExpanded] = useState(false);
  const [comment, setComment] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ allComments, setAllComments] = useState([])
  const [isLiked, setIsLiked] = useState(false)
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const myInfo = useSelector(state => state.user.myInfo)

  useEffect(() => {
    setIsLiked(post.isLiked)
    fetchComments(post._id)
  },[])
 
  const fetchComments = async (postId) => {
    try {
      
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/posts/${postId}/comments`,
        {
          method: "GET",
          headers: {
            authorization: localStorage.getItem("MyToken"),
          },
        }
      );

      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
        setAllComments(data.comments)
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const handleComment = async () => {
    setComment("")
    try {
      
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/posts/${post._id}/comments`,
        {
          method: "Post",
          body:JSON.stringify({comment:comment }),
          headers: {
            "content-type": "application/json",
            authorization: localStorage.getItem("MyToken"),
          },
        }
      );
      if (response.status !== 200) {
        const data = await response.json();
        console.log(data);
        setError(data.error);
        setIsLoading(false);
      } else {
        const data = await response.json();
        setIsLoading(false);
          fetchPosts( post._id)
      }
    } catch (error) {
      console.log(error);
      setError(error)
      setIsLoading(false);
    }
  };

  const handleLikes = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/posts/${post._id}/likes`,
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
        setIsLiked(data.post.isLiked)
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };


  return (
    <Card sx={{ width: 1, mt: 2 }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box style={{display:"flex", justifyContent:'space-between'}}>

      <Box style={{display:"flex", justifyContent:'flex-start'}}>
        <Avatar
              src={
                post?.postedBy?.avatar ||
                "https://ui-avatars.com/api/?name=John+Doe"
              }
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
              />
            <div style={{textAlign:'left' , marginLeft:'10px'}}>

        <Typography>
        {`${post?.postedBy?.name} ${post?.postedBy?.surname}`}
        </Typography>
        <Typography>
        {new Date(post?.createdAt).toLocaleTimeString()}
        </Typography>
            </div>
      </Box>
      <IconButton onClick={() => {}}>
      <MoreVertRounded className="three-dots"/>
      </IconButton>
      </Box>
      <CardContent className="border-bottom border-top">
        <Typography variant="body2" color="text.secondary">
          {post?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{color:isLiked? "rgb(30,131,173, 0.6)":"grey"}} onClick={()=>handleLikes()}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <TextField
            className="comment-input"
            margin="normal"
            fullWidth
            size="small"
            id="comment"
            label="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoFocus
          />
          <Button
            variant="contained"
            style={{ display: comment?.length > 1 ? "block" : "none" }}
            onClick={(e) => handleComment(e)}
          >
            Post
          </Button>
          <Typography paragraph>Comments:</Typography>
          <div>
          {allComments?.map((item, i) => 
            <Box key={i} className="comment-box" >
              <div>
                <img src={item?.commentedBy?.avatar} alt={item?.commentedBy?.name} />
                <Typography className="commentedBy">{item?.commentedBy?.name} {item?.commentedBy?.surname}</Typography>
              </div>
              <Typography paragraph>{item?.comment}</Typography>
            </Box>
          )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
