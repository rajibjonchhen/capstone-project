import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { setRoleAction } from '../redux/actions/action'

function ForInvestor() {
    
    const dispatch = useDispatch()
  return (
    <Container>
        <Row>
            <Col>
            <p className="h1">
                How we support <span>Investor </span>
            </p>
                <Button className="theme-btn" onClick={() => dispatch(setRoleAction("investor")) }> Join as an Investor</Button>
            </Col>
        </Row>
    </Container>
  )
}

export default ForInvestor