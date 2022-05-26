import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePaginationAction } from "../redux/actions/action";
import "./profilSidebar.css";

function ProfilSidebar({setShowProfileMenu, showProfileMenu}) {

  const myInfo = useSelector(state => state.user.myInfo)
  const profilePagination = useSelector(
    (state) => state.user.profilePagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    if(profilePagination.length === 0){
      dispatch(setProfilePaginationAction("My Creations"));
    }
  }, []);

  const highlightColor = "rgb(3,78,106)"

  return (
     
      <div className="profile-btn-grand-box text-left"  >
        <div
        className="profile-btn-box"
          style={{
         
          }}>
          {myInfo?.role === "creator" &&
          <Button
            className="profile-btn"
            name="My Creations"
            style={{
              backgroundColor:
                profilePagination === "My Creations" && `${highlightColor}`
            }}
            onClick={(e) =>{ dispatch(setProfilePaginationAction(e.target.name)); setShowProfileMenu(!showProfileMenu)}}
          >
            My Creations
          </Button> 
          }
          <Button
          className="profile-btn"
          name="Projects Liked"
          style={{
            backgroundColor:
              profilePagination === "Projects Liked" && `${highlightColor}`
          }}
          onClick={(e) => {dispatch(setProfilePaginationAction(e.target.name)); setShowProfileMenu(!showProfileMenu)}}
          >
          Projects Liked
          </Button>
          <Button
          className="profile-btn"
            name="My Messages"
            style={{
              backgroundColor:
                profilePagination === "My Messages" && `${highlightColor}`
            }}
            onClick={(e) => {dispatch(setProfilePaginationAction(e.target.name)); setShowProfileMenu(!showProfileMenu)}}
          >
            My Messages
          </Button>

         {myInfo?.role !== "investor" && <Button
          className="profile-btn"
            name="Add New Product"
            style={{
              backgroundColor:
                profilePagination === "Add New Product" && `${highlightColor}`
            }}
            onClick={(e) => {dispatch(setProfilePaginationAction(e.target.name)); setShowProfileMenu(!showProfileMenu)}}
          >
            Add New Product
          </Button>}
          
          <Button
          className="profile-btn"
            name="My Account"
            style={{
              backgroundColor:
                profilePagination === "My Account" && `${highlightColor}`
            }}
            onClick={(e) => {dispatch(setProfilePaginationAction(e.target.name)) ; setShowProfileMenu(!showProfileMenu)}}
          >
            My Account
          </Button>
        </div>
      </div>
  );
}

export default ProfilSidebar;
