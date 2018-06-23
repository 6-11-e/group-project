import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Modal } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import SignupModal from './Signup';

const alignNav = {
    display: 'inline-block',
    float: 'none',
  }
  

class Login extends Component {

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
                <FormGroup style={alignNav}>
                    <FormControl type="text" name="email" placeholder="Email" />
                    <FormControl type="password" name="password" placeholder="Password" />
                </FormGroup>{' '}
                <Button type="submit" style={alignNav}>Submit</Button>
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