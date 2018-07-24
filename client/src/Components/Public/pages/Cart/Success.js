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