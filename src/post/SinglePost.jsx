import { Button } from "@material-ui/core";
import { MoreVertRounded } from "@mui/icons-material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { Alert, Box, TextField } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./singlePost.css";

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
  },[allComments])
 
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
          setAllComments([...allComments, data.comment])
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
    <Card sx={{ backgroundColor:"rgb(34,73,90)", color:"white", width: 1, mt: 2, p:1, border:"1px solid rgb(56,88,103)" }}>
      {error && <Alert severity="error">{error}</Alert>}
      <Box style={{display:"flex", justifyContent:'space-between',  padding:"5px",}}>

      <Box style={{display:"flex", justifyContent:'flex-start'}}>
        <Avatar
              src={
                post?.postedBy?.avatar ||
                "https://ui-avatars.com/api/?name=John+Doe"
              }
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
      <MoreVertRounded className="three-dots text-white"/>
      </IconButton>
      </Box>
      <CardContent style={{borderTop:"1px solid rgb(56,88,103)", borderBottom:"1px solid rgb(56,88,103)", minHeight:'80px'}}>
        <Typography variant="body2" >
          {post?.content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites" style={{color:isLiked? "rgb(30,131,173, 1)":"grey"}} onClick={()=>handleLikes()}>
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon style={{color:"white", fontSize:"20px"}}/>
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
          >
          <Typography style={{transform:expanded? "rotate(180deg)":"rotate(0deg)",padding:"5px", color:"white"}}>Comment</Typography>
          <ExpandMoreIcon className="text-white" />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
        <div style={{ display:"flex", alignItems:'center',position:'relative'}}>
                    
                        <input
                            // onClick={()=>{setOpen(true)}}
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}

                            placeholder = 'Post a comment'
                            className="form-control"
                            style={{
                                paddingLeft: "10px",
                                paddingTop: "10px",
                                paddingBottom: "10px",
                                paddingRight:"70px",
                                textAlign: "left",
                                fontWeight: "normal",
                                width:"100%",
                                borderRadius:"30px",
                            }}

                            />
                
                
                        <button className='theme-btn' style={{position:"absolute",right:"1px", borderRadius:"30px", height:'35px'}} 
                            onClick={(e) => { if(comment.length > 1){handleComment(e)}}}>Send</button>
                    </div>
          {/* <input
            className="form-control"
            margin="normal"
            fullWidth
            size="small"
            id="comment"
            label="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            autoFocus
            style={{
              paddingLeft: "10px",
              paddingTop: "10px",
              paddingBottom: "10px",
              paddingRight:"70px",
              textAlign: "left",
              fontWeight: "normal",
              width:"100%",
              borderRadius:"30px",
          }}

          />
          <Button
            variant="contained"
            style={{ display: comment?.length > 1 ? "block" : "none", borderRadius:"30px" }}
            onClick={(e) => handleComment(e)}
          >
            Post
          </Button> */}
          <Typography paragraph>Comments:</Typography>
          <div>
          {allComments?.map((item, i) => 
            <Box key={i} className="comment-box" >
              <div>
                <img src={item?.commentedBy?.avatar} alt={item?.commentedBy?.name} />
                <Typography className="commentedBy">{item?.commentedBy?.name} {item?.commentedBy?.surname}</Typography>
              </div>
              <Typography >{item?.comment}</Typography>
            </Box>
          )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  );
}
