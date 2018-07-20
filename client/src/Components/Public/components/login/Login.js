import React, { Component } from 'react';
// import { Navbar } from 'react-bootstrap';
import {
    FormGroup,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    Input,
    Form,
    Col
} from 'reactstrap';
import {toast} from 'react-toastify';
// import { FormGroup } from 'react-bootstrap';
// import { Button } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
// import { FormControl } from 'react-bootstrap';
// import SignupModal from './Signup';

// const alignButton = {
//     display: 'inline-block',
//     float: 'none',
//     borderRadius: '0%',
//     backgroundColor: '#3a3a3a',
//     border: 'none'
//   }

// const modalContainer = {
//     position: 'absolute',
//     right: '140px',
//     backgroundColor: 'white',
//     width: '40%'
// }

const alignNav = {
    display: 'inline-block',
    float: 'none',
}

// const modalStyle = {
//     height: '100px',
//     display: 'inline-block'
// }
  

class Login extends Component {
    //Handle show and hide modal
  

    constructor(props) {
        super(props);
        this.handleShow = this.handleShow.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
    
        this.state = {
          show: false
        };

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleToggle() {
        this.setState({ show: !this.state.show });
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
                toast.success(`Welcome back, ${response.data.user.firstName}`, {
                    position: toast.POSITION.BOTTOM_RIGHT,
                  })
                this.handleToggle()
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
                <Button color="primary" size="sm" onClick={this.handleShow} style={alignNav}>
                    Log In! <i className="fal fa-sign-in"></i>
                </Button>
                <Modal isOpen={this.state.show} toggle={this.handleToggle} className="loginModal">
                    <ModalHeader toggle={this.handleToggle}>
                        Login
                    </ModalHeader>
                    
                    <ModalBody>
                        <Col xs={12} md={{size: 10, offset: 1}}>
                            <Form onSubmit={this.handleSubmit}> 
                                <FormGroup row>
                                    <Input type="email" name="email" placeholder="Email" className="form-control" />&nbsp;
                                </FormGroup>    
                                <FormGroup row>    
                                    <Input type="password" name="password" placeholder="Password" className="form-control" />
                                </FormGroup>
                                <Button color="primary" type="submit" block>Login</Button>
                            {/* <SignupModal style={alignNav}/> */}
                            </Form>
                        </Col>
                    </ModalBody>
                </Modal>
            </div>
        )
    }
}

export default Login;