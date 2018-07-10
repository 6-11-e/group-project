import React, { Component } from 'react';
// import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
// import SignupModal from './Signup';

// const alignButton = {
//     display: 'inline-block',
//     float: 'none',
//     borderRadius: '0%',
//     backgroundColor: '#3a3a3a',
//     border: 'none'
//   }

const alignNav = {
    display: 'inline-block',
    float: 'none',
}

const modalStyle = {
    height: '100px',
    display: 'inline-block'
}
  

class Login extends Component {
    //Handle show and hide modal
  

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
    
        this.state = {
          show: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleClose() {
        this.setState({ show: false });
    }

    handleShow() {
        this.setState({ show: true });
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
                console.log(this.props)
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
            <div className="NavDiv">
                {/* Cant use API endpoint with standard form action (will nav to new page) */}
                {/* Instead, need to fetch data from API and update state */}
                {/* <form > action="/api/auth/login" method="POST" */}
                <Button bsStyle="primary" bsSize="small" onClick={this.handleShow} style={alignNav}>
                    Log In! <i className="fal fa-sign-in"></i>
                </Button>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Log In</Modal.Title>
                    </Modal.Header>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                    <Modal.Body>
                        
                            <FormGroup style={alignNav}>
                                <FormControl type="text" name="email" placeholder="Email"/>&nbsp;
                                <FormControl type="password" name="password" placeholder="Password"/>
                            </FormGroup>{' '}
                        {/* <SignupModal style={alignNav}/> */}
                        
                    </Modal.Body>
                    <Modal.Footer>
                        <Button type="submit" style={alignNav}>Log In</Button>
                    </Modal.Footer>
                    </form>
                </Modal>
            </div>
        )
    }
}

export default Login;