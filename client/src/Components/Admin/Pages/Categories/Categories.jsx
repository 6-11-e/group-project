import React from 'react';
import{
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    Form,
    Input,
    Label,
    Button,
    ListGroup,
    ListGroupItem
} from 'reactstrap';
import Loader from '../../Loader/Loader';

export default class Categories extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
        this.loading = false;
        this.done = false;
    }

    getCategories() {
        this.setState({done: false});
        fetch('/api/store/categories', {
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
            this.setState({data});
        })
        .then( () => {
            this.setState({done: true})
        })
    }
    componentWillMount() {
        this.getCategories();
    }
    render() {
                
        return(
            <Grid>
                {this.state.done !== true ? (<Loader/>) : (
                    <div>
                        <div className="pageHeader">
                            <h1>Product Categories</h1>
                            <Button href="/admin/store/category/new">New Category</Button>
                        </div>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <div className="cardTools">
                                            <Form inline className="cardToolsForm">
                                                <Input type="text" placeholder="Search Categories..." className="form-control" bsSize="sm"/>&nbsp;
                                                <Label for="perPageSelect">Per Page&nbsp;</Label>
                                                <Input type="select" defaultValue={this.state.perPage} onChange={this.handleChangePerPage} className="form-control" bsSize="sm" id="perPageSelect">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </Input>
                                            </Form>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <ListGroup>
                                            {this.state.data.categories.map( (cat, key) => (
                                                <ListGroupItem tag="a" key={key} href={"/admin/store/category/edit/"+cat._id}>
                                                    {cat.name}
                                                    {/* Badge to display if showFP */}
                                                </ListGroupItem>
                                            ))}
                                        </ListGroup>
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