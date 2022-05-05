import { Container, Grid } from "@material-ui/core";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setProfilePaginationAction } from "../redux/actions/action";
import "./extraHeader.css";

function ExtraNavbar() {
  const profilePagination = useSelector(
    (state) => state.user.profilePagination
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setProfilePaginationAction("My Creations"));
  }, []);

  return (
    <Container  className="extra-header">
      <Grid container>
        <Grid
          item
          xs={12}
          sm={12}
          md={10}
          lg={10}
          style={{
            margin: "auto",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Button
            name="My Creations"
            style={{
              backgroundColor:
                profilePagination === "My Creations" && "rgb(160,38,38, 0.2)",
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Creations
          </Button>
          <Button
            name="My Messages"
            style={{
              backgroundColor:
                profilePagination === "My Messages" && "rgb(160,38,38, 0.2)",
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Messages
          </Button>
          <Button
            name="Add New Product"
            style={{
              backgroundColor:
                profilePagination === "Add New Product" && "rgb(160,38,38, 0.2)",
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            Add New Product
          </Button>
          <Button
            name="My Account"
            style={{
              backgroundColor:
                profilePagination === "My Account" && "rgb(160,38,38, 0.2)",
            }}
            onClick={(e) => dispatch(setProfilePaginationAction(e.target.name))}
          >
            My Account
          </Button>
        </Grid>
        </Grid>
    </Container>
  );
}

export default ExtraNavbar;
