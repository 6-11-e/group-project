import React from 'react';
import {
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input
} from 'reactstrap';
import Loader from '../../Loader/Loader';

export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state;
        this.state.data = {};
        this.state.productID = this.props.match.params.id;
        this.state.loading = false;
        this.state.done = false;

    }

    getProduct() {
        this.setState({done: false});
        fetch(`/api/store/product/id=${this.state.productID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
        .then( response => {
            if(response.ok === true){
                return response.json()
            }
            return response.statusText;
        })
        .then( response => {
            var data = this.state.data;
            data = response.data;
            this.setState({data})
        })
        .then( () => {
            this.setState({done: true})
        })
    }
    componentWillMount() {
        this.getProduct();
    }
    render() {
        const {product} = this.state.data;
        // console.log(product)
        return(
            <Grid>
                {this.state.done !== true ? (<Loader/>) : (
                    <div>
                        <Row>
                            <div className="pageHeader">
                                <h1>Product Management</h1>
                            </div>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>Product Details</CardHeader>
                                    <CardBody>
                                        <Form>
                                        <Row>
                                            {/* Product Primary Image, button for manage images */}
                                            <Col xs="12" md="3">
                                                <div className="imagePanel">
                                                    <span className="prodPrimaryImg">
                                                        <img src="https://placehold.it/400&text=Product%20Image" alt="Primary image for product" className="img-responsive"/>
                                                    </span>
                                                    <span className="imgsB">
                                                        <Button color="success">Edit Images</Button>
                                                    </span>
                                                </div>
                                            </Col>
                                            {/* Primary Form */}
                                            <Col xs="12" md="9" >
                                                <FormGroup row>
                                                    <Label for="name" sm={2}>Name</Label>
                                                    <Col sm={10}>
                                                        <Input type="text" name="name" id="name" placeholder="Product Name..." className="form-control" defaultValue={product.name}/>
                                                    </Col> 
                                                </FormGroup>
                                                <Row>
                                                    <Col sm={{size: 10, offset: 2}} md={{size: 4, offset: 2}}>
                                                        <FormGroup inline check>
                                                            <Label check>
                                                                <Input type="checkbox" name="deleted" checked={product.deleted} onChange={this.handleDeletedChange} sm={6} md={4} /> Remove Product?
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm={{size: 10, offset: 2}} md={{size: 4, offset: 2}}>
                                                        <FormGroup row>
                                                            <Label for="price" inline>$</Label><Input type="number" name="price" id="price" className="form-control" defaultValue={product.price}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                {/* use a special onChange function(event) to listen for event.name as product field in state */}
                                                {/* Use grid with form, set formGroup.pull-right#positioning for save/cancel */}
                                            </Col>
                                        </Row>
                                        </Form>
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