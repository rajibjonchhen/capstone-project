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
    <Grid container style={{ background: "blue" }}>
      <Grid
        item
        xs={12}
        md={8}
        style={{
          background: "red",
          margin: "auto",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Grid container>
          <Grid item xs={12} md={6}>
            <Card sx={{ maxWidth: 361, margin: "auto" }}>
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
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default HowWeHelp;
