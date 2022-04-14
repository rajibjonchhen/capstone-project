import {
  Avatar,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Home } from "@mui/icons-material";
import { Button, Card } from "@mui/material";

function HowWeHelp() {
  return (
   
        
          
            <Card sx={{ maxWidth: "100%", margin: "auto" }}>
              <Avatar sx={{ m: "10px auto", bgcolor: "secondary" }}>
                <Home />
              </Avatar>
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="secondary"
                  gutterBottom
                >
                  Word of the Day
                </Typography>
                <Typography variant="h5" component="div"></Typography>
                <Typography sx={{ mb: 1.5 }} color="secondary">
                  adjective
                </Typography>
                <Typography variant="body2">
                  well meaning and kindly.
                  <br />
                  {'"a benevolent smile"'}
                </Typography>
              </CardContent>
            </Card>
         
        
      
  );
}

export default HowWeHelp;
