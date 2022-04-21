import {
  Avatar,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@material-ui/core";
import { Home } from "@mui/icons-material";
import { Button, Card } from "@mui/material";
import "./howWeHelpCard.css"


function HowWeHelp({information}) {
  return (
        <div className="how-we-help-card">
          {/* <img src={information.image} alt={information.title}/> */}
          <div className="small-icons">
            {information?.image}
          </div>
          <p>{information?.title}</p>
          <p>{information?.description}</p>
        </div>
      
  );
}

export default HowWeHelp;
