import { AppBar, CssBaseline, Toolbar, Typography } from "@material-ui/core";
import { Flare } from "@mui/icons-material";

function MyNavbar() {
  return ( 
    <>
        <CssBaseline/>
        <AppBar color="primary">
            <Toolbar>
                <Flare className="App-logo"/>
                <Typography>Creator's Space</Typography>
            </Toolbar>
        </AppBar>
              
        </>
   );
}

export default MyNavbar;