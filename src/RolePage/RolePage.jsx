import { Button } from '@material-ui/core'
import { Lightbulb, MonetizationOn } from '@mui/icons-material'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import "./rolePage.css"

function RolePage() {

    const [role, setRole] = useState("")
    const [error, setError] = useState("")

    useEffect(() => {

        if(role === "creator" ||  role === "investor"){
           handleRole() 
        }
    },[role])
    
    const handleRole = async(userId) => {
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_BE_URL}/users/me`,{
                method:"PUT",
                body:JSON.stringify({role}),
                headers:{
                    "content-type":"application/json",
                    "authorization": localStorage.getItem("MyToken")
                }
            })
            if(response.status !== 0){
                const data = await response.json()
                console.log(data)
                setError("Couldn't set the role try again")
            } else {
                const data = await response.json()
                console.log(data)
            }
            console.log("my role is role", role)
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className="role-container">
        <Container>
        <p className="h1">Select your role</p>
            <Row>
                <Col >
                    <Button className="role" onClick={() => setRole("creator")}>
                        <div >
                            <span>
                                <Lightbulb className="role-icon"/>
                            </span>
                            <span>
                                Creator
                            </span>
                        </div>
                    </Button>
                </Col>
                <Col >
                <Button  className="role"  onClick={() => setRole("investor")}>
                    <div >
                        <span>
                            <MonetizationOn className="role-icon"/>
                        </span>
                        <span>
                            Investor
                        </span>
                    </div>
                </Button>
                </Col>
            </Row>
        </Container>
    </div>
  )
}

export default RolePage