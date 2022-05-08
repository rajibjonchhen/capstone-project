import { Typography } from "@mui/material";
import { Container } from "react-bootstrap";
import { useSelector } from 'react-redux';
import "./leftSide.css";

function LeftSidebar({fetchPosts}) {
    const myInfo = useSelector(state => state.user.myInfo)
    // const [open, setOpen] = useState(false);
     

    return ( 
    <Container className="left-side" style={{boxShadow:"0 0 3px 3px rgb(224,224,224,0.3)", padding:"10px"}} >
            <div  >
                <img src={myInfo?.avatar} alt="avatar" />
            </div>
            <h4>{myInfo.name} {myInfo.surname}</h4>
            <Typography>{myInfo?.email}</Typography>
            <Typography>{myInfo?.role}</Typography>
            {/* <Button variant="containted" onClick={() => setOpen(true)}>Add new post</Button> */}
                {/* {open && <AddPostEdit  fetchPosts={fetchPosts} open={open} setOpen={setOpen}/>} */}
    </Container>
     );
}

export default LeftSidebar;