import React, { Component } from 'react';
import { Container, Row, Col } from 'reactstrap';

const demoCol = {
    textAlign: 'left',
    border: 'solid 1px black',
    height: 'auto',
    margin: '25px',
    padding: '20px'
}

const borderBottom = {
    // borderBottom: 'solid 1px black'
}

const photoDemo = {
    width: '100px',
    height: '100px',
    backgroundColor: 'black',
}

const itemStyle = {
    display: 'flex',
    alignItems: 'center',
    margin: '10px',
    justifyContent: 'space-between'
}

const listStyle = {
    listStyle: 'none',
    padding: '0px'
}

class Cart extends React.Component {
    render() {
        return (
            <Container fluid>
                <h1>Cart</h1>
                <Row>
                    <Col xs="8">
                        <div style={demoCol}>
                            <ul style={listStyle}>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <h4>Demo Item</h4>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <h4>Demo Item 2</h4>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div style={demoCol}>
                            <h4 style={borderBottom}>Order Summary</h4>
                            <p style={borderBottom}>Subtotal:     </p>
                            <p style={borderBottom}>Shipping:     </p>
                            <p style={borderBottom}>Estimated Tax:     </p>
                            <p style={borderBottom}>Order Total:     </p>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={demoCol}>
                        </div>
                    </Col>
                    <Col>
                        <div style={demoCol}>
                        </div>
                    </Col>
                    <Col>
                        <div style={demoCol}>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Cart;