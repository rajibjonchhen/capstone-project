import React from 'react'
import {  Jumbotron } from 'react-bootstrap'
import JumboPic from "../assets/business-idea.jpg"
import "./myJumbotron.css"
function MyJumbotron() {
  return (
    <Jumbotron fluid className="my-jumbotron">
        <div >     
            <div>
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
            </div>
        </div>
    </Jumbotron>
  )
}

export default MyJumbotron