import { Box, Typography } from "@mui/material";
import { Button, Image, Jumbotron } from "react-bootstrap";

function MyJumbotron() {
    return ( 
        <Jumbotron sx={{display:"flex"}}>
          <Box>
          <Typography variant="h3" paragraph>
            An idea can change the the world and <br/>
            together we can make a difference        
          </Typography>
   
          <Button variant="primary">Learn more</Button>
          </Box>
          <Box>
          <Image src="https://blog.bonus.ly/hs-fs/hubfs/team-putting-together-puzzle-01.png?width=1200&name=team-putting-together-puzzle-01.png"  width="400"/>
          </Box>
      </Jumbotron>
     );
}

export default MyJumbotron;