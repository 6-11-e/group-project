import React, { Component } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';

const demoCol = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column'
}

const itemSpans = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
}

const mySpan = {
    display: 'flex',
    justifyContent: 'space-between'
}

const orderSummary = {
    marginBottom: '100px'
}

const demoCol2 = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    marginTop: '20px'
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
    margin: '10px 10px 10px 0px',
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
                            <ul style={listStyle} className="shoppingList">
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 2</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 3</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 4</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </Col>
                    <Col xs="4">
                        <div style={demoCol}>
                            <h4 style={borderBottom}>Order Summary</h4>
                            <div style={orderSummary}>
                            <span style={mySpan}><p style={borderBottom}>Subtotal:</p><p>$9.99</p></span>
                            <span style={mySpan}><p style={borderBottom}>Shipping:</p><p>Free</p></span>
                            <span style={mySpan}><p style={borderBottom}>Estimated Tax:</p><p>$.60</p></span>
                            <span style={mySpan}><p style={borderBottom}>Order Total:</p><p>$10.59</p></span>
                            </div>
                            <Button>Checkout</Button>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div style={demoCol2}>

                        </div>
                    </Col>
                    <Col>
                        <div style={demoCol2}>
                        </div>
                    </Col>
                    <Col>
                        <div style={demoCol2}>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Cart;