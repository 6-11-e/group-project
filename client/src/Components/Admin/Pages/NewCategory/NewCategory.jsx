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

export default class NewCategory extends React.Component {
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
            showFP: (formData.get('showFP') === 'on' ? true : false)
        }

        fetch('/api/store/category/new', {
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
            let linkPath = `/admin/store/categories`;
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
                    <h1>New Category</h1>
                </div>
                <Row>
                    <Col xs={12} md={{size: 6, offset: 3}}>
                        <Card>
                            <CardHeader>Category Details</CardHeader>
                            <CardBody>
                                <Form onSubmit={this.handleFormSubmit}>
                                    <FormGroup row>
                                        <Label for="name" xs={3}>Name</Label>
                                        <Col xs={9} >
                                            <Input name="name" placeholder="Category Name..." id="name" className="form-control"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row>
                                        <Label for="description" xs={12} md={3}>Description</Label>
                                        <Col xs={12} md={9}>
                                            <Input type="textarea" placeholder="Category Description..." id="description" name="description" className="form-control"/>
                                        </Col>
                                    </FormGroup>
                                    <FormGroup row check>
                                        <Label for="showFP" inline check xs={{size: 8, offset: 4}}>
                                            <Input type="checkbox" name="showFP" id="showFP"/>
                                            Show on Frontend?
                                        </Label>
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