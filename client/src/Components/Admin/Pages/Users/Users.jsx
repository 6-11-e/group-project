import React from 'react';
import{
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    // CardFooter,
    CardBody,
    CardTitle,
    CardLink,
    // CardText,
    // ListGroup,
    // ListGroupItem,
    Form,
    Input,
    Label
} from 'reactstrap';
import Loader from '../../Loader/Loader';
import './style.css';

export default class Users extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
        this.state.data = {};
        this.state.loading = false;
        this.state.done = false;
        this.state.perPage = 10;
        this.state.page = 1;
        this.handleChangePerPage = this.handleChangePerPage.bind(this)
        console.log('page',this.props.match.page)
    }

    getUsers() {
        this.setState({done: false});
        if(this.state.loading === false) {
            console.log('Fetching Users')
            fetch(`http://localhost:5000/api/admin/users/${this.state.perPage}/${this.state.page}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                }
            })
            .then( response => {
                if(response.ok === true) {
                    // console.log(response)
                    return response.json();
                }
                return response.statusText;
            })
            .then(response => {
                var data = this.state.data;
                data.users = response.data;
                console.log(data)
                this.setState({data})
            })
            .then( () => {
                this.setState({done: true})
            })
        }
    }

    componentWillMount(){
        this.getUsers();
    }
    handleChangePerPage(event){
        this.setState({perPage: event.target.value}, this.getUsers)
        // this.getUsers();
    }
    render() {
        return(
            <Grid>
                {this.state.done !== true? (<Loader/>) : (
                    <div>
                        <div className="pageHeader">
                            <h1>Users</h1>
                            {/* {this.state.data.users.map( (user, key) => <p key={key}>{user.firstName}</p>)} */}
                        </div>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>
                                        <div className="cardTools">
                                            <Form inline className="cardToolsForm">
                                                <Input type="text" placeholder="Search Users..." className="form-control" bsSize="sm"/>&nbsp;
                                                <Label for="perPageSelect">Per Page</Label>&nbsp;
                                                <Input type="select" defaultValue={this.state.perPage} onChange={this.handleChangePerPage} className="form-control" bsSize="sm" id="perPageSelect">
                                                    <option value="10">10</option>
                                                    <option value="25">25</option>
                                                    <option value="50">50</option>
                                                </Input>
                                            </Form>
                                        </div>
                                    </CardHeader>
                                    <CardBody>
                                        <Row>
                                            {this.state.data.users.map( (user,key) => (
                                                <Col xs={12} md={3} key={key} className="userListItem">
                                                    <Card>
                                                        <CardBody className="userName">
                                                            <CardTitle>{user.firstName ? user.firstName : (<span className="text-muted">null</span>)} {user.lastName ? user.lastName : (<span className="text-muted">null</span>)}</CardTitle>
                                                            
                                                        </CardBody>
                                                        <img src="https://placehold.it/400&text=No%20Image" alt=""/>
                                                        <CardBody>
                                                            <CardLink href={`/admin/users/${user._id}`}><i className="fal fa-fw fa-user-edit"></i> Manage</CardLink>
                                                        </CardBody>
                                                    </Card>
                                                </Col>
                                                // <ListGroupItem tag="a" key={key} href={"/admin/users/" + user._id }>
                                                //     {user.firstName + ' ' + user.lastName}
                                                // </ListGroupItem>
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