import { Typography } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import { useSelector } from 'react-redux';
import "./leftSide.css";
import RightSidebar from "./RightSidebar";

function LeftSidebar({fetchPosts}) {
    const myInfo = useSelector(state => state.user.myInfo)
    // const [open, setOpen] = useState(false);
     

    return ( 
    <div className="left-side" style={{border:"1px solid rgb(56,88,102)", paddingTop:"10px"}} >
            <div >
                <div>
                    <img src={myInfo?.avatar} alt="avatar" />
                </div>
            </div>

            <div>
                <div>
            <h4>{myInfo.name} {myInfo.surname}</h4>
            <Typography>{myInfo?.email}</Typography>
            <Typography>{myInfo?.role}</Typography>
            {/* <Button variant="containted" onClick={() => setOpen(true)}>Add new post</Button> */}
                {/* {open && <AddPostEdit  fetchPosts={fetchPosts} open={open} setOpen={setOpen}/>} */}
                </div>
            </div>
            <RightSidebar/>
    </div>
     );
}

export default LeftSidebar;