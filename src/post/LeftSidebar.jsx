import { Button, Typography } from "@mui/material";
import { useSelector } from 'react-redux';
import { setChatUserAction } from "../redux/actions/action";
import "./leftSide.css";
import RightSidebar from "./RightSidebar";

function LeftSidebar({fetchPosts}) {
    const myInfo = useSelector(state => state.user.myInfo)
    const chatUser = useSelector(state => state.user.chatUser)
    // const [open, setOpen] = useState(false);
     

    return ( 
    <div className="left-side" style={{border:"1px solid rgb(56,88,102)",overflow:"hidden"}} >
         {/* <Button className="theme-btn mx-auto border-bottom mt-n1 p-3 mb-4 w-100" style={{display:chatUser? "block":"none"}} onClick={() => dispatchEvent(setChatUserAction({}))} >Show all Posts</Button> */}
            <div className="mt-3">
                <div>
                    <img src={myInfo?.avatar || `https://ui-avatars.com/api/?name=${myInfo.name}+${myInfo.surname}`} alt="avatar" />
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