import React, { useEffect } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { setRoleAction } from '../redux/actions/action'

function ForCreator() {
    
    const dispatch = useDispatch()

    const role = useSelector(state => state.user.role)

    useEffect(() => {
        if(role){

            console.log("role changed", role)
        }
    }, [role])
  return (
    <Container>
        <Row>
            <Col>
            <p className="h1">
                How we support <span>Creator </span>
            </p>
                <Button className="theme-btn" onClick={() => dispatch(setRoleAction("creator")) }>Get value of your Creativity </Button>
            </Col>
        </Row>
    </Container>
  )
}





export default ForCreator

