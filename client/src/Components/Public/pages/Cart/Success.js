import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const successMark = {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
}

const summary = {
    marginTop: '5px',
    marginBottom: '50px',
    border: 'solid 1px black',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

}

const mySpan = {
    width: '20%',
    display: 'flex',
    justifyContent: 'space-between'
}




class Success extends React.Component {
    render() {
        return (
        <Container>
            <Row>
            <Col sm="12">
            <div style={successMark}>
                <div className="check_mark">
                    <div className="sa-icon sa-success animate">
                    <span className="sa-line sa-tip animateSuccessTip"></span>
                    <span className="sa-line sa-long animateSuccessLong"></span>
                    <div className="sa-placeholder"></div>
                    <div className="sa-fix"></div>
                    </div>
                </div>
            </div>
            </Col>
            </Row>
            <Row>
            <Col sm="12">
                <h1>Success!</h1>
            </Col>
            </Row>
            <Row>
                <Col>
                    
                </Col>
            </Row>
            <Row>
                <Col sm="2"></Col>
                <Col sm="8"><span><h3>Order Summary</h3></span></Col>
            </Row>
            <Row>
            <div style={summary}>
                <Col sm="4">
                <span style={mySpan}><p>Subtotal: </p><p>$9.99</p></span>
                </Col>
            </div>
            </Row>
        </Container>
        )
    }
}

export default Success;