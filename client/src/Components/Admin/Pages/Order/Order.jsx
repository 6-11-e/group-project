import React from 'react';
import {
    Container as Grid,
    Col,
    Row,
    Card,
    CardHeader,
    CardBody,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Form,
    FormGroup,
    Label
} from 'reactstrap';
import Loader from '../../Loader/Loader';
import style from './style.css'
import { toast } from '../../../../../node_modules/react-toastify';

export default class Order extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
        this.state.done = false;
        this.getOrder = this.getOrder.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
        this.handleStatusChange = this.handleStatusChange.bind(this)
        this.updateOrder = this.updateOrder.bind(this)
        this.state.data = {}
        this.state.orderID = this.props.match.params.id;
        this.state.showItemModal = false;
        this.showItemModal = this.showItemModal.bind(this)
        this.handleUpdateOrderItems = this.handleUpdateOrderItems.bind(this);
    }
    handleUpdateOrderItems(e){
        e.preventDefault();
        let formData = new FormData(e.target)
        let itemsRemoved = [];
        for(let key  of formData.keys()){
            let item = {id: key, qty: formData.get(key)}
            itemsRemoved.push(item);
        }
        //put fetch in own function, pass in itemsRemoved. This is so ReturnAll can process using same fetch.
        fetch(`/api/store/order/admin/${this.state.orderID}/refund`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            method: 'POST',
            body: JSON.stringify(itemsRemoved)
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText
        })
        .then( response => {
            toast(`Successfully refunded $${response.data.amount}!`);
        })
        .then( () => {
            this.getOrder();
        })
    }
    showItemModal(){
        this.setState({showItemModal: !this.state.showItemModal});
    }

    getOrder() {
        this.setState({done: false});
        fetch(`/api/store/order/admin/${this.state.orderID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText;
        })
        .then( response => {
            let {data} = this.state;
            data = response.data
            console.log(data)
            this.setState({data})
        })
        .then( () => {
            this.setState({done: true})
        })
    }
    componentWillMount(){
        this.getOrder()
    }
    handleFormSubmit(e){
        e.preventDefault();
    }
    handleStatusChange(e){
        let {data} = this.state;
        data.order.status = e.target.value;
        this.setState({data}, this.updateOrder());
    }
    updateOrder(){
        this.setState({done: false})
        fetch(`/api/store/order/admin/${this.state.orderID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            method: 'POST',
            body: JSON.stringify(this.state.data.order)
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText;
        })
        .then( response => {
            if(response.status == 'ok') this.getOrder()
        })
    }
    render(){
        if(this.state.done){
            let {order} = this.state.data;
            let {customer} = this.state.data;
            let showReturnAll = false;
            if(order.status == 'cancelled' && order.amountReturned !== order.total){
                //set flag
                showReturnAll = true;
            }
            return(
                <Grid>
                    <div className="pageHeader">
                        <h1>Order Management</h1>
                    </div>
                    <Row>
                        <Col xs={12} md={{size: 8, offset: 2}}>
                            <Card>
                                <CardHeader>
                                    Order Details
                                    <div className="cardTools">
                                        Some Stuff
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <Row>
                                        <h5>Order #: {order._id}</h5>
                                        {/* User Info */}
                                        <Col xs={12} md={6}>
                                            <h6>Customer Information</h6>
                                            <div className="userInfo">
                                                <p className="emphText">{customer.firstName} {customer.lastName}</p>
                                                <p><a href="mailto:{order.email}"><i className="fal fa-fw fa-envelope"></i> <span className="emphText">{order.email}</span></a></p>
                                                <p><a href="tel:{order.phone}"><i className="fal fa-fw fa-phone fa-rotate-90"></i> {order.phone}</a></p>
                                            </div>
                                        </Col>
                                        {/* Order Options */}
                                        <Col xs={12} md={6}>
                                            <h6>Order Options</h6>
                                            {order.amountReturned !== order.total ? (
                                            <Input type="select" onChange={this.handleStatusChange} defaultValue={order.status} className="form-control">
                                                <option value="pending">Pending</option>
                                                <option value="cancelled">Cancelled</option>
                                                <option value="complete">Complete</option>
                                            </Input>
                                            ):(
                                                <Input type="select" value={order.status} disabled>
                                                    <option value="returned">Returned</option>
                                                </Input>
                                            )}
                                            {showReturnAll ? (
                                                <Button color="success">Return All</Button>
                                            ):''}
                                        </Col>
                                    </Row>
                                    <Row>
                                        {/* Shipping Information */}
                                        <Col xs={12} md={6}>
                                            <h6>Shipping Information</h6>
                                            <div className="address">
                                                <p className="addressName">To <span className="emphText">{order.shipping.name}</span></p>
                                                <p className="emphText">{order.shipping.address.street}</p>
                                                {order.shipping.address.line2 !== '' ? (
                                                    <p className="emphText"></p>
                                                ):''}
                                                <p className="emphText">{order.shipping.address.city} {order.shipping.address.state} {order.shipping.address.zip}</p>
                                                {/* <p className="emphText">{order.shipping.address.country}</p> */}
                                            </div>
                                        </Col>
                                        {/* ITems */}
                                        <Col xs={12} md={6}>
                                            <h6>Items</h6>
                                            <ul className="itemContainer">
                                                {order.items.map( (item, key) => (
                                                    <li key={key} className="listItem">
                                                        <span className="prodImg">
                                                            {/* img for primary */}
                                                            <img src="https://placehold.it/400&text=No%20Image" alt="Product Image" className="img-responsive"/>
                                                        </span>
                                                        <div className="prodInfo">
                                                            <div className="top">
                                                                <span className="pull-left">{item.name}</span>
                                                                <span className="pull-right">Each: ${item.price}</span>
                                                            </div>
                                                            <div className="bottom">
                                                                <span className="pull-left">Qty: {item.qty}</span>
                                                                <span className="pull-right">Total: {(item.price * item.qty).toFixed(2)}</span>
                                                            </div>
                                                        </div>
                                                        
                                                    </li>
                                                ))}
                                            </ul>
                                            <Button color="primary" onClick={this.showItemModal}>Manage Items</Button>
                                        </Col>
                                    </Row>
                                    {/* {console.log(order)} */}
                                    <Row>
                                        <Col xs={{size: 6, offset: 6}} md={{size: 4, offset: 8}}>
                                            <div className="totalBox text-right">
                                                <p>Subtotal: ${order.subtotal}</p>
                                                <p>Tax: ${order.tax.toFixed(2)}</p>
                                                <p>Shipping: ${order.shippingCost}</p>
                                                <span className="divider"></span>
                                                <p>Total: ${order.total}</p>
                                                <p>Returned: ${order.amountReturned.toFixed(2)}</p>
                                            </div>
                                        </Col>  
                                    </Row>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                    <Modal isOpen={this.state.showItemModal} toggle={this.showItemModal} className="itemModal">
                        <ModalHeader toggle={this.showItemModal}>
                            Manage Order Items
                        </ModalHeader>
                        <ModalBody>
                            <div className="manageItemList">
                                <Form onSubmit={this.handleUpdateOrderItems}>
                                {order.items.map( (item, key) => (
                                    <Card key={key}>
                                        <CardHeader>{item.name}</CardHeader>
                                        <CardBody>
                                            <Row>
                                                <Col xs={12} md={4}>
                                                    <div>
                                                        <img src="http://placehold.it/400&text=Product%20Image" alt="Product Image" className="img-responsive"/>
                                                    </div>
                                                </Col>
                                                <Col xs={12} md={8}>
                                                    <p>Price: <span>${item.price}</span></p>
                                                    <p>Qty: <span>{item.qty}</span></p>
                                                    <p>Tax: <span>{((item.price * item.qty) * 0.06).toFixed(2)}</span></p>
                                                    <p>Total: <span>${((item.price * item.qty) * 1.06).toFixed(2)}</span></p>
                                                    <FormGroup row>
                                                        <Label inline xs={12}>Return</Label>
                                                        <Input name={item._id} max={item.qty} min={0} defaultValue={0} type="number"/>
                                                    </FormGroup>
                                                </Col>
                                            </Row>
                                            
                                        </CardBody>
                                    </Card>
                                ))}
                                <Button type="submit">Return</Button>
                                </Form>
                            </div>
                        </ModalBody>
                        
                    </Modal>
                </Grid>
            )
        } else {
            return( <Loader/>)
        }
    }
}