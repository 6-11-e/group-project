import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
import SignupModal from './Signup';

const alignNav = {
    display: 'inline-block',
    float: 'none',
  }
  

class Login extends Component {
    render() {
        return (
            <Navbar.Form pullLeft style={alignNav}>
                <FormGroup style={alignNav}>
                    <FormControl type="text" placeholder="Username" />
                    <FormControl type="password" placeholder="Password" />
                </FormGroup>{' '}
                <Button type="submit" style={alignNav}>Submit</Button>
                <SignupModal style={alignNav}/>
            </Navbar.Form>
        )
    }
}

export default Login;