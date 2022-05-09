import { Button } from '@material-ui/core'
import React from 'react'
import {  Col, Container, Jumbotron, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import JumboPic from "../assets/business-idea.jpg"
import "./myJumbotron.css"
function MyJumbotron() {

    const navigate = useNavigate()
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
                <Button style={{backgroundColor:"grey", color:"white", marginRight:'5px'}} onClick={() => navigate("/aboutUs")}>Know more</Button>
                <Button style={{backgroundColor:"grey", color:"white"}} onClick={() => navigate("/")}>Connect with Us</Button>
            </div>
        </Row>
    </Container>
  )
}

export default MyJumbotron