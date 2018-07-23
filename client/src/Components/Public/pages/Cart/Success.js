import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Card,
    CardBody
} from 'reactstrap';

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
    constructor(props){
        super(props)
        this.state = {
            orderID: this.props.match.params.orderID,
            order: {},
            done: false
        }
        this.getOrder = this.getOrder.bind(this)
    }
    componentWillMount(){
        this.getOrder();
    }
    getOrder(){
        this.setState({done: false});
        fetch('/api/store/order/view/' + this.state.orderID, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then( response => {
            if(response.ok) return response.json()
            else throw new Error('Unable to connect!')
        })
        .then( response => {
            let {order} = this.state;
            order = response.data.order;
            console.log(order)
            this.setState({order, done: true})
        })
    }
    render() {
        if(this.state.done){
            let {order} = this.state;
            return (
                <Container>
                    <Row>
                    <Col sm={12} md={{size: 8, offset: 2}}>
                    <Card>
                        <CardBody>
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
                            <Row>
                                <div className="centerTitle" style={{textAlign: 'center', width: '100%'}}>
                                <h1>Success!</h1>
                                </div>
                            </Row>
                            <Row>
                                {/* Name & Shipping */}
                                <Col xs={12} md={6}>
                                    <h3>Ship To</h3>
                                    <div className="addresses">
                                        <div className="userAddress">
                                            <span className="name">{order.shipping.name}</span>
                                            <p>{order.shipping.address.street}</p>
                                            <p>{order.shipping.address.line2}</p>
                                            <p>{order.shipping.address.city} {order.shipping.address.state} {order.shipping.address.zip}</p>
                                        </div>
                                    </div>
                                </Col>
                                {/* Order # & Totals */}
                                <Col xs={12} md={6}>
                                    <h3>Order Details</h3>

                                    <p>${order.total}</p>
                                    <p>Billed from: **{order.paymentLast4} {order.paymentBrand}</p>
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                   
                    </Col>
                    </Row>
                    
                </Container>
                )
        } else {
            return '';
        }
    }
}

export default Success;