
import { Photo, Videocam, Work } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../others/Loader';
import { setAllPostsAction } from '../redux/actions/action';
import AddPostEdit from './AddPostEdit';
import ChatBox from './ChatBox';
import LeftSidebar from './LeftSidebar';
import "./postPage.css";
import RightSidebar from './RightSidebar';
import SinglePost from "./SinglePost";


function PostPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState (false)
    const [open, setOpen] = useState(false);
     
    
    const allPosts = useSelector(state => state.post.allPosts)
    const myInfo = useSelector(state => state.user.myInfo)
    const chatUser = useSelector(state => state.chat.chatUser)
    const currentChat = useSelector(state => state.chat.currentChat)
    
    useEffect(() =>{
        window.scrollTo(0,0)
        console.log("allPosts", allPosts)
        fetchPosts()
    },[])

  

    const fetchPosts = async() => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/posts`,{
                method:"GET",
                headers:{
                    "authorization" : localStorage.getItem("MyToken"),
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
            } else{
                const data = await response.json()
                console.log(data.posts)
                dispatch(setAllPostsAction(data.posts))
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(error)
        } 
    }

   
    
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    return ( <>
    {isLoading? <Loader/> : error? <div>{error}</div> :
    <Grid container spacing={1} style={{backgroundColor:'white', maxHeight:"100vh", overflow:"hidden"}}> 
        <Grid item sm={12} md={6} lg={3} className="theme-light-bg" style={{width:"100%",height:"100%", margin:"0 auto"}}>
            <Item style={{width:"100%",margin:"auto"}}>
                <LeftSidebar fetchPosts={fetchPosts} />
            </Item>
        </Grid>

        <Grid item sm={12} md={6} lg={6} className="posts-box theme-light-bg">

            {Object.keys(chatUser).length  > 0? <ChatBox/> : <>
                <Item sx={{ margin:"3px 0px 0px", height:"100%"}}>
                    <div>

                <div style={{display:"flex", alignItems:'center'}}>
                    <Avatar
                    sx={{margin:"0 5px"}}
                    src={myInfo?.avatar}
                    alt="user image"
                    />
                        <button
                            onClick={()=>{setOpen(true)}}
                            style={{
                            paddingLeft: "10px",
                            
                            paddingTop: "10px",
                            paddingBottom: "10px",
                            textAlign: "left",
                            fontWeight: "normal",
                            width:"100%",
                            borderRadius:"30px",
                            
                            }}
                        >
                Start a post
                </button>
                        
                    </div>
                <div>
                {open && <AddPostEdit  fetchPosts={fetchPosts} open={open} setOpen={setOpen}/>}
            </div>
            <div style={{display:"flex", marginTop:'10px', justifyContent:'center'}}>
                <div style={{display:"flex"}}>
                <Photo/>
                <Typography sx={{margin:"0 5px"}}>Photo</Typography>
                </div>
                <div style={{display:"flex"}}>
                <Videocam/>
                <Typography sx={{margin:"0 5px"}}>Video</Typography>
                </div>
                <div style={{display:"flex"}}>
                <Work/>
                <Typography sx={{margin:"0 5px"}}>Job</Typography>
                </div>
            </div>
            </div>
            <div style={{height:"100%", overflow:"scroll"}}>
                { allPosts?.map((post, i) => <SinglePost  key={i} fetchPosts={fetchPosts} post={post}/>)}
            </div>
                </Item> 
                </>}
        </Grid>
        <Grid item sm={12} md={3} lg={3} style={{width:"100%",height:"100%", margin:"0 auto"}}>
            <Item >
                <RightSidebar/>
            </Item>
        </Grid>
    </Grid> }
    </>);
}

export default PostPage;

