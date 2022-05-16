import { Button } from '@material-ui/core'
import { useEffect } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import "./myJumbotron.css"
function MyJumbotron() {

    const myInfo = useSelector(state => state.user.myInfo)

    const navigate = useNavigate()
    useEffect(() => {
        window.scrollTo(0, 0)
    },[])
  return (
    <Container fluid className="my-jumbotron">
        <Row >     
            <div sm={6}>
                <p className="h3">
                    If you have an idea worth a business ?
                </p>
                <p className="h3">
                    If you are looking for new investment oppurtinity?
                </p>
                <p className="h3">
                    We are here to help you 
                </p>
                <h1>We Connect ideas with money</h1>
                <div style={{display:"flex" , justifyContent:"center"}}>
                    <Button className="jumbotron-btn" style={{ marginRight:'5px'}} onClick={() => navigate("/about")}>Know more</Button>
                    <Button className="jumbotron-btn" style={{ display:myInfo?._id? "none":"block"}} onClick={() => navigate("/")}>Connect with Us</Button>
                </div>
            </div>
        </Row>
    </Container>
  )
}

export default MyJumbotron