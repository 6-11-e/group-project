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
    alignItems: 'center',
    width: '100%',
    height: 'auto'
}

const mySpan = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    // width: '20%'
}

const demoCol = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column',
    margin: '20px'
}

const orderSummary = {
    marginBottom: '100px',
    width: '100%',
}

const shiptTo = {
    marginBottom: '100px',
    width: '100%',
    lineHeight: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'

}

const listStyle = {
    listStyle: 'none',
    padding: '0px'
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

const itemSpans = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-end'
}

const productList = {
    width: '100%'
}

const demoCol2 = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    marginTop: '20px',
    backgroundImage: 'url(https://gettingontravel.com/wp-content/uploads/2017/08/Vizcaya-Museum-and-Gardens-759x500.jpg)'
}

const relatedProducts = {
    // display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center'
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
            <div style={demoCol}>
            <Row>
            <Col sm="12">
                        <h3>Order Summary</h3>
                        <div stlye={productList}>
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
            </Row>
            {/* <div style={summary}> */}
            <Row>
            <Col md="6">
                            <div style={orderSummary}>
                            <h4>Cost Breakdown</h4>
                            <span style={mySpan}><p>Subtotal:</p><p>$9.99</p></span>
                            <span style={mySpan}><p>Shipping:</p><p>Free</p></span>
                            <span style={mySpan}><p>Estimated Tax:</p><p>$.60</p></span>
                            <span style={mySpan}><p>Order Total:</p><p>$10.59</p></span>
                            </div>
            </Col>      
            <Col md="6">
                            <div style={shiptTo}>
                            <h4>Shipping Info</h4>
                            <span style={mySpan}><p>Ray West</p></span>
                            <span style={mySpan}><p>5555 Address Rd</p></span>
                            <span style={mySpan}><p>City, State 55555</p></span>
                            <span style={mySpan}><p>555-555-5555</p></span>
                            <span style={mySpan}><p>email@email.com</p></span>
                            </div>
            </Col>      
            </Row>
            </div>
            {/* </div> */}
        </Container>
        )
    }
}

export default Success;