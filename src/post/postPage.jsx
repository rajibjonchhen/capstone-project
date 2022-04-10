
import * as React from 'react';
import { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SinglePost from "./SinglePost";
import RightSidebar from './RightSidebar';
import { Image } from 'react-bootstrap';
import LeftSidebar from './LeftSidebar';
import getMyInfo from '../getMyInfo';
import { useNavigate } from 'react-router-dom';
import { setAllPostsAction } from '../redux/actions/action';
import { useDispatch, useSelector } from 'react-redux';
import "./postPage.css"


function PostPage() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const [isLoading, setIsLoading] = useState (false)

    const allPosts = useSelector(state => state.post.allPosts)

   
    useEffect(() =>{
        fetchPosts()
    },[])

   

    const fetchPosts = async() => {
        try {
            console.log(process.env.REACT_APP_DEV_BE_URL)
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
        } 
    }

    const Item = styled(Paper)(({ theme }) => ({
        backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
      }));
      
    return ( 
        <Grid container spacing={2}> 
            <Grid item sm={12} md={3} lg={3} >
                <Item>
                    <LeftSidebar/>
                </Item>
            </Grid>
            <Grid item sm={12} md={6} lg={6} className="posts-box">
                <Item>
                    {allPosts?.map(post => <SinglePost post={post}/>)}
                    
                </Item>
            </Grid>
            <Grid item sm={12} md={3} lg={3}>
                <Item>
                    <RightSidebar/>
                </Item>
            </Grid>
        </Grid>
     );
}

export default PostPage;

