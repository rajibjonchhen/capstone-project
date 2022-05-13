import {
  AppBar,
  Avatar,
  CssBaseline,
  Grid,
  Toolbar,
  Typography
} from "@material-ui/core";
import { Flare } from "@mui/icons-material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MailIcon from "@mui/icons-material/Mail";
import MoreIcon from "@mui/icons-material/MoreVert";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { alpha, styled } from "@mui/material/styles";
import * as React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { setSelectedCategoryAction } from "../redux/actions/action";
import "./myNavbar.css";

function MyNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const myInfo = useSelector((state) => state.user.myInfo);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const dispatch = useDispatch()
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  useEffect(() => {
    if(myInfo){
      fetchUnreadMsgCount()
    }
  }, []);


  const fetchUnreadMsgCount = async() =>{
    try {
      const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/messages`)
    } catch (error) {
      
    }
  }

 

  const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  }));

  const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }));

  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: "inherit",
    "& .MuiInputBase-input": {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("md")]: {
        width: "20ch",
      },
    },
  }));

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/profile");
        }}
      >
        Profile
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          navigate("/account");
        }}
      >
        My account
      </MenuItem>
      <MenuItem
        onClick={() => {
          handleMenuClose();
          localStorage.removeItem("MyToken");
          navigate("/");
        }}
      >
        Logout
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={() => {}}>
        <Typography>Product</Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          navigate("/posts");
        }}
      >
        <Typography>Community</Typography>
      </MenuItem>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 1 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Box>
    </Menu>
  );

  return (
    <>
      <CssBaseline />

      <AppBar style={{ background: "rgb(4, 52, 71)", color: "white",width:"100%", position:"sticky", top:'0' }}>
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
              justifyContent: "center",
            }}
          >
            <Toolbar style={{ width: "100%", padding: 0 }}>
              <Flare className="App-logo" onClick={() => navigate("/home")} />

              <Typography className="brand" onClick={() => navigate("/home")}>
                {" "}
                Creator's Space
              </Typography>

              <Box
                sx={{ flexGrow: 1 }}
                style={{
                  display: location.pathname === "/product" || "/post" ? 1 : 0,
                }}
              />

              <Box sx={{ display: { xs: "none", md: "flex"} }}>
                {/* <Box style={{ display: "flex", alignItems: "center" }}>
                  <Search>
                    <SearchIconWrapper>
                      <SearchIcon />
                    </SearchIconWrapper>
                    <StyledInputBase
                      placeholder="Search…"
                      inputProps={{ "aria-label": "search" }}
                    />
                  </Search>
                </Box> */}
              
                
                
                <MenuItem className="my-margin-xasix"
                  onClick={() => {
                    navigate("/home");
                  }}
                >
                 Home
                </MenuItem>

                <MenuItem className="my-margin-xasix"
                  onClick={() => {
                    navigate("/about");
                  }}
                >
                  About Us
                </MenuItem>

                <MenuItem className="my-margin-xasix"
                  onClick={() => {
                    dispatch(setSelectedCategoryAction("all"))
                    navigate("/products");
                  }}
                >
                  Products
                </MenuItem>

                <MenuItem className="my-margin-xasix"
                  onClick={() => {
                    if(myInfo?._id){

                      navigate("/posts");
                    }else{
                      navigate("/direct")
                    }
                  }}
                >
                 Community
                </MenuItem>

                

                <MenuItem className="my-margin-xasix"
                  onClick={() => {
                    if(myInfo?._id){
                     
                      navigate("/profile");
                    }else{
                      navigate("/direct");
                    }
                  }}
                >
                    Profile
                </MenuItem>

                <Box className="my-margin-xasix flex-center">
                  <IconButton
                    size="large"
                    aria-label="show 4 new mails"
                    color="inherit"
                  >
                    <Badge badgeContent={4} color="error">
                      <MailIcon />
                    </Badge>
                  </IconButton>
                </Box>

                <Box className="my-margin-xasix flex-center">
                  <IconButton
                    size="large"
                    aria-label="show 17 new notifications"
                    color="inherit"
                  >
                    <Badge badgeContent={1} color="error">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                </Box>

                <IconButton className="my-margin-xasix"
                  size="large"
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <Avatar
                    src={
                      myInfo?.avatar ||
                      "https://ui-avatars.com/api/?name=John+Doe"
                    }
                    className="userImg"
                  />
                </IconButton>
              </Box>

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </Grid>
        </Grid>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </>
  );
}

export default MyNavbar;
