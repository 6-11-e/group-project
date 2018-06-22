import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap';
import { FormGroup } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { FormControl } from 'react-bootstrap';
// import SignupModal from './Signup';

const alignNav = {
    display: 'inline-block',
    float: 'none',
  }
  

class Login extends Component {
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
                <FormGroup style={alignNav}>
                    <FormControl type="text" name="email" placeholder="Email"/>&nbsp;
                    <FormControl type="password" name="password" placeholder="Password"/>
                </FormGroup>{' '}
                <Button type="submit" style={alignNav}>Submit</Button>
                {/* <SignupModal style={alignNav}/> */}

                </form>
            </Navbar.Form>
        )
    }
}

export default Login;