import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';

const alignNav = {
    display: 'inline-block',
    float: 'none',
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
  
    render() {  
      return (
        <div className='NavDiv'>
          <Button bsStyle="primary" bsSize="small" onClick={this.handleShow} style={alignNav}>
            Sign Up!
          </Button>
  
          <Modal show={this.state.show} onHide={this.handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Sign Up</Modal.Title>
              <div className="Modal-header">
                <div className="Modal-image">
                </div>
              </div>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <FormGroup className="Signup-modal">
                        <FormControl
                        type='text'
                        value={this.state.value}
                        placeholder='First Name'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                        <FormControl
                        type='text'
                        value={this.state.value}
                        placeholder='Last Name'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                        <FormControl
                        type='email'
                        value={this.state.value}
                        placeholder='Email'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                        <FormControl
                        type='email'
                        value={this.state.value}
                        placeholder='Confirm Email'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                        <FormControl
                        type='password'
                        value={this.state.value}
                        placeholder='Create a Password'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                        <FormControl
                        type='password'
                        value={this.state.value}
                        placeholder='Confirm Password'
                        onChange={this.handleChange}
                        className="Signup-modal"
                        />
                    </FormGroup>
                </form>
            </Modal.Body>
            <Modal.Footer>
              <Button>Sign Up</Button>
            </Modal.Footer>
          </Modal>
        </div>
      );
    }
  }
  
export default SignupModal;