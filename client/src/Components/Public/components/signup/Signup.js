import React from 'react';
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
  Form,
  FormGroup,
  Input,
  // Label,
  Col
} from 'reactstrap'
import {toast} from 'react-toastify';
// import { Button } from 'react-bootstrap';
// import { Modal } from 'react-bootstrap';
// import { FormControl } from 'react-bootstrap';
// import { FormGroup } from 'react-bootstrap';
import './Signup.css'

// const alignButton = {
//     display: 'inline-block',
//     float: 'none',
//     borderRadius: '0%',
//     backgroundColor: '#3a3a3a',
//     border: 'none'
//   }
  
// const signUpMargin = {
//   marginBottom: '20px'
// }

class SignupModal extends React.Component {
    
    //Handle show and hide modal
    constructor(props, context) {
      super(props, context);
  
      this.handleShow = this.handleShow.bind(this);
      this.handleClose = this.handleClose.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this)
  
      this.state = {
        show: false
      };
    }
  
    handleClose() {
      this.setState({ show: false });
    }
  
    handleShow() {
      this.setState({ show: !this.state.show });
    }
    
    handleSubmit(event) {
      //Prevent default form handling
      event.preventDefault();

      //Extract form data
      var data = new FormData(event.target);

      //Perform POST register
      fetch('/api/auth/register', {
        body: JSON.stringify({
          email: data.get('email'),
          password: data.get('password'),
          firstName: data.get('firstName'),
          lastName: data.get('lastName'),
          emailConfirm: data.get('emailConfirm'),
          passwordConfirm: data.get('passwordConfirm')
        }),
        headers: {
          "Content-Type": "application/json"
        },
        method: 'POST',
        mode: 'cors'
      }).then(response => response.json())
      .then(response => {
        console.log(response);
        toast.success(`Thanks! You're now registered and can log in!`, {
          position: toast.POSITION.BOTTOM_RIGHT,
        })
        this.setState({show: false})
      });
    }
    render() {  
      return (
        <div className='NavDiv'>
          <Button color="secondary" size="sm" onClick={this.handleShow} >
            Sign Up!
          </Button>
  
          <Modal isOpen={this.state.show} toggle={this.handleShow}>
            <ModalHeader toggle={this.handleShow}>
              Register
            </ModalHeader>

            {/* <form action="api/auth/register" method="POST"> */}
            <ModalBody>
              <Col xs={12} md={{size: 10, offset: 1}}>
              <Form onSubmit={this.handleSubmit}>
                <FormGroup row>
                  <Input type="text" className="form-control" name="firstName" placeholder="First Name" />
                </FormGroup>
                <FormGroup row>
                  <Input type="text" className="form-control" name="lastName" placeholder="Last Name" />
                </FormGroup>
                <FormGroup row>
                  <Input type="email" className="form-control" name="email" placeholder="Email" />
                </FormGroup>
                <FormGroup row>
                  <Input type="email" className="form-control" name="emailConfirm" placeholder="Confirm Email" />
                </FormGroup>
                <FormGroup row>
                  <Input type="password" className="form-control" name="password" placeholder="Create a Password" />
                </FormGroup>
                <FormGroup row>
                  <Input type="password" className="form-control" name="passwordConfirm" placeholder="Confirm Password" />
                </FormGroup>
                <Button type="submit" block>Register</Button>
              </Form>
              </Col> 
                    {/* <FormGroup>
                        <FormControl
                        type='text'
                        name='firstName'
                        value={this.state.value}
                        placeholder='First Name'
                        onChange={this.handleChange}
                        style={signUpMargin}
                        />
                        <FormControl
                        type='text'
                        name='lastName'
                        value={this.state.value}
                        placeholder='Last Name'
                        onChange={this.handleChange}
                        style={signUpMargin}
                        />
                        <FormControl
                        type='email'
                        name='email'
                        value={this.state.value}
                        placeholder='Email'
                        onChange={this.handleChange}
                        style={signUpMargin}
                        />
                        <FormControl
                        type='email'
                        name='emailConfirm'
                        value={this.state.value}
                        placeholder='Confirm Email'
                        onChange={this.handleChange}
                        style={signUpMargin}
                        />
                        <FormControl
                        type='password'
                        name='password'
                        value={this.state.value}
                        placeholder='Create a Password'
                        onChange={this.handleChange}
                        style={signUpMargin}
                        />
                        <FormControl
                        type='password'
                        name='passwordConfirm'
                        value={this.state.value}
                        placeholder='Confirm Password'
                        onChange={this.handleChange}
                        />
                    </FormGroup> */}
                
            </ModalBody>
          </Modal>
        </div>
      );
    }
  }
  
export default SignupModal;