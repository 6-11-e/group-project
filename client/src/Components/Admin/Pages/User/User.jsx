import React from 'react';
import{
  Container as Grid,
  Row,
  Col,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  CardText,
  Button
} from 'reactstrap';
import {Link} from 'react-router-dom';
import Loader from '../../Loader/Loader';
import userAvatar from '../../../../img/profile-clipart-generic-user-1_400.png';
// import userImage from '../../../public/img/profile-clipart-generic-user1_400';

export default class User extends React.Component {
  constructor(props) {
      super(props)
      this.state = this.props.state;
      this.state.data = {};
      this.state.userID = this.props.match.params.id;
      // this.state.loading = false;
      this.state.done = false;
      console.log(this.props.match.params.id)
  }

  getUser() {
      this.setState({done: false});
      fetch(`http://localhost:5000/api/admin/user/${this.state.userID}`, {
          headers: {
              'Content-Type': 'application/json',
              'Authorization': this.state.token
          }
      })
      .then( response => {
          if(response.ok === true){
              return response.json();
          }
          return response.statusText;
      })
      .then( response => {

          var data = this.state.data;
          data.user = response.data;
          console.log(data);
          this.setState({data})
      })
      .then( () => {
          this.setState({done: true})
      })
  }
  componentWillMount() {
      this.getUser();
  }
  render(){
    const {user} = this.state.data;
    console.log('Render', user)
    return(
      <Grid>
        {this.state.done !== true ? (<Loader/>) : (
          <div>
            <Row>
              <div className="pageHeader">
                  <h1>User Management</h1>
              </div>
            </Row>
            <Row>
              <Col xs="12">
                <Card>
                  <CardHeader>User Details</CardHeader>
                  <CardBody>
                    <Row>
                      {/* Avatar or Stock image */}
                      <Col xs="12" md="3">
                          <img src={userAvatar} className="img-responsive profileImg"/>
                      </Col>
                      {/* User information */}
                      <Col xs="12" md="6">
                          <CardTitle>{`${user.firstName} ${user.lastName}`}</CardTitle>

                      </Col>
                      {/* Options */}
                      <Col xs="12" md="3">
                        <Button block color="secondary" disabled><i className="fal fa-fw fa-lock"></i> Disable User</Button>
                        <Button block color="danger" disabled><i className="fal fa-fw fa-sync"></i> Reset Password</Button>
                        <Button block color="primary" tag={'a'} href={'mailto:'+user.email} ><i className="fal fa-fw fa-envelope"></i> Email User</Button>
                      </Col>
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