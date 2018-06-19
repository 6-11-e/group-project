import React, { Component } from "react";
import { Navbar } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { MenuItem } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import Login from './Login';
import SignupModal from "./Signup";

//Commented out sections are waiting on routing

const alignNav = {
  display: 'inline-block',
  float: 'none',
}

const noMargin = {
    marginBottom: '0px'
}

const navItemStyle = {
    marginBottom: '15px'
}



class Header extends Component {
    render() {
        return ( 
    <Navbar style={noMargin}>
      <Navbar.Header>
        <Navbar.Brand>
          E-Commerce
        {/* <Link to="/">E-Commerce</Link> */}
        </Navbar.Brand>
      </Navbar.Header>
      <Nav style={alignNav} pullRight>
        <Login />
        {/* <SignupModal /> */}
        <NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown" style={alignNav}>
        <NavItem>
          Item{/* <Link to="/" style={navItemStyle}></Link> */}
        </NavItem>
        <NavItem>
          Item{/* <Link to="/" style={navItemStyle}></Link> */}
        </NavItem>
        <NavItem>
          Item{/* <Link to="/" style={navItemStyle}></Link> */}
        </NavItem>
        </NavDropdown>
      </Nav>
    </Navbar>
    )
}
}



export default Header;