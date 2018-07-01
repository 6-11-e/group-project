import React, { Component } from "react";
import { Navbar, FormGroup, FormControl, Button } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
// import { MenuItem } from 'react-bootstrap'; //Commented out to prevent console.warns
import { Link } from 'react-router-dom'; //Commented out to prevent console.warns
// import { Collapse } from 'react-bootstrap'; //Commented out to prevent console.warns
import Login from './Login';
import SignupModal from "./Signup"; //Commented out to prevent console.warns

//Commented out sections are waiting on routing

const alignNav = {
  display: 'inline-block',
  float: 'none',
}

const noContain = {
  width: '100%'
}

const primaryNav = {
    marginBottom: '0px',
    // position: 'fixed',
    width: '100%'
}

const secondaryNav = {
  height: '20px',
  borderColor: '#f8f8f8',
  marginBottom: '0px'
}

// Commented to prevent console.warns
const navItemStyle = {
    marginBottom: '15px'
}

const searchBar = {
  left: '100px'
}



class Header extends Component {
    //No need to declare constructor if not used (aside from super()).
    // constructor(props) {
    //   super(props)
    // }
    render() {
        return ( 

    //Primary Nav
  <div>
    <Navbar style={primaryNav}>
    <header>
      <Navbar.Header>
        <Navbar.Brand>
          {/* E-Commerce */}
        <Link to="/">E-Commerce</Link>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav style={alignNav} pullRight>
        {/* Adjusted <Login /> to be able to adjust state (token,user). Set to only display if user is not logged in */}
        {/* Should have alt component show instead of text. */}
        {this.props.state.isLoggedIn === false ? <Login onTokenChange={this.props.onTokenChange} onUserChange={this.props.onUserChange}/> : 'Howdy, ' + this.props.state.user.email}
        
        {this.props.state.isLoggedIn === false ? <SignupModal style={alignNav}/> : ''}
        <NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown" style={alignNav}>
        <NavItem>
          <Link to="/gallery" style={navItemStyle}>Gallery</Link>
        </NavItem>
        <NavItem>
          <Link to="/profile" style={navItemStyle}>My Profile</Link>
        </NavItem>
        <NavItem>
          Item{/* <Link to="/" style={navItemStyle}></Link> */}
        </NavItem>
        </NavDropdown>
      </Nav>
      </header>
      </Navbar>


  <Navbar style={secondaryNav}>
    <header>
      <Nav style={alignNav}>
          <NavItem>
            Category
          </NavItem>
          <NavItem>
            Another
          </NavItem>
          <NavItem>
            Additional
          </NavItem>
          <NavItem>
            Even More
          </NavItem>
          <NavItem>
            Eventually
          </NavItem>
          <NavItem>
            Finally
          </NavItem>
      </Nav>
    </header>
  </Navbar>
</div>
    )
}
}



export default Header;