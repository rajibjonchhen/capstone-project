import React from 'react'
import {  Jumbotron } from 'react-bootstrap'
import JumboPic from "../assets/business-idea.jpg"

function MyJumbotron() {
  return (
    <Jumbotron fluid style={{ backgroundImage:`url(${JumboPic}) `,backgroundRepeat:"no-repeat", backgroundSize:"cover", height:"600px", backgroundPosition:'center'}}>
        <div >
            
        <div>
            <h1>We Connect ideas with money</h1>
            <p>
                If you have an idea worth a business ?
            </p>
            <p>
                If you are looking for new investment oppurtinity?
            </p>
            <p>
                We are here to help you 
            </p>
        </div>
        </div>
    </Jumbotron>
  )
}

export default MyJumbotron