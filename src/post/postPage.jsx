
import * as React from 'react';
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



function PostPage() {
    const navigate = useNavigate()
    const [myInfo, setMyInfo] = React.useState({})
    React.useEffect(() =>{
        setMyInfo(getMyInfo())

    },[])

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
            <Grid item sm={12} md={6} lg={6}>
                <Item>
                    <SinglePost/>
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

