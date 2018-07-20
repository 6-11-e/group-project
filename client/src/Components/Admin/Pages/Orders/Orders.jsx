import React from 'react'
import{
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Form,
    Input,
    Label,
    // ListGroup,
    // ListGroupItem,
    Badge
} from 'reactstrap';
import Loader from '../../Loader/Loader';
import './style.css';

export default class Orders extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.state;
        this.state.perPage = 10;
        this.state.page = 1;
        this.state.done = false;
        this.state.data = {};
        this.handleChangePerPage = this.handleChangePerPage.bind(this)
        this.getOrders = this.getOrders.bind(this)
    }
    getOrders(){
        this.setState({done: false})
        console.log(this.state.perPage)
        fetch(`/api/store/orders/admin/${this.state.perPage}/${this.state.page}`, {
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
            data = response.data;
            console.log(response)
            this.setState({data})
        })
        .then( () => {
            //Additional processing
            this.setState({done: true})
        })

    }
    componentWillMount(){
        this.getOrders()
    }
    handleChangePerPage(e){
        this.setState({perPage: e.target.value}, this.getOrders)
    }

    render(){
        let {orders} = this.state.data;
        return(
            <Grid>
                {this.state.done !== true ? (
                    <Loader />
                ):(
                    <div>
                        <div className="pageHeader">
                            <h1>Orders</h1>
                        </div>
                        <Row>
                            <Col xs={12}>
                                <Card>
                                    <CardHeader>
                                        <div className="cardTools">
                                            <Form inline className="cardToolsForm">
                                                <Input type="text" placeholder="Search Orders..." bsSize="sm" className="form-control"/>&nbsp;
                                                <Label for="perPage">
                                                    Per Page&nbsp;
                                                </Label>
                                                <Input type="select" defaultValue={this.state.perPage} onChange={this.handleChangePerPage} className="form-control" bsSize="sm">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </Input>
                                            </Form>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            {/* {console.log('Data: ', data)} */}
                                            {orders.map( (order, key) => (
                                                <Col xs={12} key={key} className="orderListItem">
                                                {/*  tag="a" href={`/admin/store/orders/${order._id}`} */}
                                                    <Card>
                                                    <CardTitle>
                                                        Order #: {order._id}
                                                        <span className="pull-right"><Badge>{order.status}</Badge></span>
                                                    </CardTitle>
                                                    <CardBody>
                                                    
                                                        <Row>
                                                            <Col xs={6} md={{size: 5, offset: 1}}>
                                                                <div className="orderListText">
                                                                    <p>Placed: {order.created}</p>
                                                                    <p>Modified: {order.updated}</p>
                                                                    <p>Items: ///</p>
                                                                </div>
                                                            </Col>
                                                            <Col xs={6}>
                                                                <div className="orderListText">
                                                                    
                                                                    <p>Total: ${order.total}</p>
                                                                    <p>Refunded: ${order.amountReturned.toFixed(2)}</p>
                                                                    <p>Events: {parseInt(order.history.length - 1, 10)}</p>
                                                                </div>
                                                            </Col>
                                                        </Row>
                                                    
                                                    </CardBody>
                                                    </Card>
                                                </Col>
                                            ))}
                                        </Row>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    </div>
                )}
            </Grid>
            
        )
    }
}