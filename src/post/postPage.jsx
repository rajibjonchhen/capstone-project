
import { Photo, Videocam, Work } from '@mui/icons-material';
import { Avatar, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Loader from '../others/Loader';
import { setAllPostsAction } from '../redux/actions/action';
import AddPostEdit from './AddPostEdit';
import ChatBox from './ChatBox';
import LeftSidebar from './LeftSidebar';
import "./postPage.css";
import SinglePost from "./SinglePost";


function PostPage() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [newPost, setNewPost] = useState({
        content: "",
      });
    
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
                console.log(data.posts.reverse())
                dispatch(setAllPostsAction(data.posts))
                setIsLoading(false)
            }
        } catch (error) {
            console.log(error)
            setIsLoading(false)
            setError(error)
        } 
    }


    

    const uploadPost = async() => {
        try {
           
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/posts`,{
                method:"POST",
                body : JSON.stringify(newPost),
                headers:{
                    "content-type" :"application/json",
                    "authorization": localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 200){
                const data = await response.json()
                console.log(data)
                setError(data.error)
                setIsLoading(false)
              } else{
                const data = await response.json()
                console.log(data)
                setIsLoading(false)
                setNewPost({content:""})
                fetchPosts()
              }
            } catch (error) {
              console.log(error)
              setIsLoading(false)
        }
        }
    
    
    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? 'rgb(0, 0, 0, 0)' : 'rgb(0, 0, 0, 0)',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    return ( <>
    {isLoading? <Loader/> : error? <div>{error}</div> :
    <Container spacing={1} style={{minHeight:"90vh", paddingTop:"100px 0", margin:"20px auto"}}> 
        <Row >

        <Col  sm={12} md={4} lg={3} style={{padding:"3px"}}>
           
                <LeftSidebar fetchPosts={fetchPosts} />
           
        </Col>

        <Col  sm={12} md={8} lg={9} style={{padding:"3px"}}>

            {Object.keys(chatUser).length  > 0? <ChatBox/> : <>
                <div sx={{ margin:"3px 0px 0px", height:"100%"}}>
                    <div>

                <div style={{ display:"flex", alignItems:'center'}}>
                    <Avatar
                    sx={{margin:"0 5px"}}
                    src={myInfo?.avatar}
                    alt="user image"
                    style={{position:'relative'}}
                    />
                        <input
                            // onClick={()=>{setOpen(true)}}
                            value={newPost.content}
                            onChange={(e) => setNewPost({content:e.target.value})}

                            placeholder = 'Start a post'
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
                
                
                        <button className='theme-btn' style={{position:"absolute",right:"4px", borderRadius:"30px", height:'35px'}} 
                    
                            onClick={(e) => { if(newPost.content.length > 1){uploadPost()}}}>send</button>
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
            <div style={{height:"90vh", overflow:"scroll"}}>
                { allPosts?.map((post, i) => <SinglePost  key={i} fetchPosts={fetchPosts} post={post}/>)}
            </div>
                </div> 
                </>}
        </Col>
        {/* <Col  sm={12} md={3} lg={3}>
                <RightSidebar/>
            
        </Col> */}
    </Row>
    </Container> }
    </>);
}

export default PostPage;

