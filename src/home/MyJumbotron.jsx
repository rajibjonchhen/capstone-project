import { Button} from "react-bootstrap";
import "./jumbotron.css"

function MyJumbotron() {
    return ( 
        <div className="jumbotron" >
          <div >
          <p>
            We believe that an idea can change the the world and
            together we can make a big difference in the society       
          </p>
          <Button variant="primary">Learn more</Button>
          </div>
          <div >
            <img  src="https://blog.bonus.ly/hs-fs/hubfs/team-putting-together-puzzle-01.png?width=1200&name=team-putting-together-puzzle-01.png" />
          </div>
      </div>
     );
}

export default MyJumbotron;