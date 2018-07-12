import React from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import './Signup.css'

const alignButton = {
    display: 'inline-block',
    float: 'none',
    borderRadius: '0%',
    backgroundColor: '#3a3a3a',
    border: 'none'
  }
  
const signUpMargin = {
  marginBottom: '20px'
}

class SignupModal extends React.Component {
    
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
        this.setState({show: false})
      });
    }
    render() {  
      return (
        <div className='NavDiv'>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleShow} style={alignButton}>
            Sign Up!
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
            </Modal.Header>

            {/* <form action="api/auth/register" method="POST"> */}
            <form onSubmit={(e) => this.handleSubmit(e)}>
            <Modal.Body>
                
                    <FormGroup>
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
                    </FormGroup>
                
            </Modal.Body>
            
            <Modal.Footer>
              <Button type="submit">Sign Up</Button>
            </Modal.Footer>
            </form>
          </Modal>
        </div>
      );
    }
  }
  
export default SignupModal;