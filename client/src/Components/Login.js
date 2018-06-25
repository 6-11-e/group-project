import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
// import SignupModal from './Signup';

const alignNav = {
    display: 'inline-block',
    float: 'none',
  }
  

class Login extends Component {
<<<<<<< HEAD

    //Handle show and hide modal
    constructor(props, context) {
        super(props, context);
        
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
        this.state = {
            show: false
        };
        }
        
        handleClose() {
        this.setState({ show: false });
        }
        
        handleShow() {
        this.setState({ show: true });
        }
      
    render() {
        return (
        <div className='NavDiv'>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleShow} style={alignNav} pullRi>
            Log In
          </Button>

          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Log In</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            {/* <Navbar.Form pullLeft style={alignNav}> */}
                <form action="/api/auth/login" method="POST">
=======
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleSubmit(event) {
        //Prevent default form handling
        event.preventDefault();

        //Extract form data
        var data = new FormData(event.target)

        //Perform POST login
        fetch('/api/auth/login', {
            //body is JSON string of form data extracted from FormData (since encoding on FormData is weird).
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password')
            }),
            //Explicitly define content type in header
            headers: {
                "Content-Type": "application/json"
            },
            method: 'POST',
            mode: 'cors'
        }).then(response => response.json())
        .then(response => {
            if(response.status === "ok" && response.data.token){
                //Successful login! We should have a token, and some userdata.
                this.props.onTokenChange(response.data.token);
                this.props.onUserChange(response.data.user);
            } else {
                //Error occurred. Check for error message (probably wrong password.)
            }
            
        })
    }
    render() {
        return (
            <Navbar.Form pullLeft style={alignNav}>

                {/* Cant use API endpoint with standard form action (will nav to new page) */}
                {/* Instead, need to fetch data from API and update state */}
                {/* <form > action="/api/auth/login" method="POST" */}
                <form onSubmit={(e) => this.handleSubmit(e)}>
>>>>>>> master
                <FormGroup style={alignNav}>
                    <FormControl type="text" name="email" placeholder="Email"/>&nbsp;
                    <FormControl type="password" name="password" placeholder="Password"/>
                </FormGroup>{' '}
                <Button type="submit" style={alignNav}>Submit</Button>
<<<<<<< HEAD
=======
                {/* <SignupModal style={alignNav}/> */}

>>>>>>> master
                </form>
            </Modal.Body>
            <Modal.Footer>
            <p>No Account?</p>
            <SignupModal style={alignNav}/>
            </Modal.Footer>
            </Modal>
        </div>
        )
    }
}

export default Login;