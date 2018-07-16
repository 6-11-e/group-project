import React from 'react'
import {
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    FormGroup,
    Label,
    Input,
    Button
} from 'reactstrap';

export default class NewProduct extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state;
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleFormSubmit = this.handleFormSubmit.bind(this)
    }
    handleFormSubmit(e){
        e.preventDefault();
        let formData = new FormData(e.target);

        let newProduct = {
            name: formData.get('name'),
            description: formData.get('description'),
            price: 0.00,
            deleted: false,
            inStock: 0,
            categories: [],
            images: []
        }

        fetch('/api/store/product/new', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            method: 'POST',
            body: JSON.stringify(newProduct)
        })
        .then( response => {
            if(response.ok){
                return response.json()
            }
            return response.statusText
        })
        .then( response => {
            //check for form errors, else proceed to new id
            let linkPath = `/admin/store/product/edit/${response.data.id}`;
            this.props.history.push(linkPath);
        })
    }
    handleGoBack(){
        this.props.history.goBack();
    }

// name, price, description {hidden deleted, instock, categories[], images[]}
    render(){
        return(
            <Grid>
                <div className="pageHeader">
                    <h1>New Product</h1>
                </div>
                <Row>
                    <Col xs={12} md={{size: 6, offset: 3}}>
                        <Card>
                            <CardHeader>Product Information</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleFormSubmit}>
                                    <FormGroup row>
                                        <Label for="name" xs={3}>Name</Label>
                                        <Col xs={9} >
                                            <Input name="name" placeholder="Product Name..." id="name" className="form-control"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="description" xs={12} md={3}>Description</Label>
                                        <Col xs={12} md={9}>
                                            <Input type="textarea" placeholder="Product Description..." id="description" name="description" className="form-control"/>
                                        </Col>
                                    </FormGroup>
                                    <div className="formControlsLeft">
                                        <Button color="secondary" onClick={this.handleGoBack}>Cancel</Button>
                                    </div>
                                    <div className="formControlsRight">
                                        <Button color="primary" type="submit">Next</Button>
                                    </div>

                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Grid>
        )
    }
}