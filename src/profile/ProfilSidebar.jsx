import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePaginationAction } from "../redux/actions/action";
import "./ProfilSidebar.css";

function ProfilSidebar() {
  const profilePagination = useSelector(
    (state) => state.user.profilePagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfilePaginationAction("My Creations"));
  }, []);

  const highlightColor = "rgb(160,38,38, 0.2)"

  return (
      <div  style={{ position:"fixed"}} >
      <div className="text-left" style={{  alignSelf:"stretch", minHeight:"100vh", borderRight:"1px solid grey"}} >
        <div
          style={{
            margin: "auto",
            height:"100%",
            display:"flex",
            flexDirection:"column",
            textAlign:"left"
          }}
          
        >
          <Button
            className="extra-header-button"
            name="My Creations"
            style={{
              backgroundColor:
                profilePagination === "My Creations" && `${highlightColor}`
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Creations
          </Button>
          <Button
          className="extra-header-button"
            name="My Messages"
            style={{
              backgroundColor:
                profilePagination === "My Messages" && `${highlightColor}`
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Messages
          </Button>
          <Button
          className="extra-header-button"
            name="Add New Product"
            style={{
              backgroundColor:
                profilePagination === "Add New Product" && `${highlightColor}`
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            Add New Product
          </Button>
          <Button
          className="extra-header-button"
            name="My Account"
            style={{
              backgroundColor:
                profilePagination === "My Account" && `${highlightColor}`
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Account
          </Button>
        </div>
      </div>
    </div>
  );
}

export default ProfilSidebar;