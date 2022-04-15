import * as React from "react";
import { useState } from "react";
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
import { Box, TextField } from "@mui/material";
import "./singlePost.css";
import { Button } from "@material-ui/core";

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

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleComment = async (postId) => {
    try {
      console.log(process.env.REACT_APP_DEV_BE_URL);
      const response = await fetch(
        `${process.env.REACT_APP_DEV_BE_URL}/posts/${postId}`,
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
        console.log(data);
        setIsLoading(false);
        fetchPosts();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <Card sx={{ width: 1, mt: 2 }}>
      <Box>
        <CardHeader
          avatar={
            <Avatar
              src={
                post?.postedBy?.avatar ||
                "https://ui-avatars.com/api/?name=John+Doe"
              }
              sx={{ bgcolor: red[500] }}
              aria-label="recipe"
            />
          }
          title={`${post?.postedBy?.name} ${post?.postedBy?.surname}`}
          subheader={new Date(post.createdAt).toLocaleTimeString()}
        />
        <Typography></Typography>
      </Box>
      <CardContent className="border-bottom border-top">
        <Typography variant="body2" color="text.secondary">
          {post.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
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
            style={{ display: comment.length > 1 ? "block" : "none" }}
            onClick={(e) => handleComment(e)}
          >
            Post
          </Button>
          <Typography paragraph>Comments:</Typography>
          {post?.comments?.map((comment) => {
            <Box>
              <Typography paragraph>{comment?.content}</Typography>
            </Box>;
          })}
        </CardContent>
      </Collapse>
    </Card>
  );
}
