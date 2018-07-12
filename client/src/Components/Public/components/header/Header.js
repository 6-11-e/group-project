import React, { Component } from "react";
import { Navbar, Button} from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { NavItem } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
// import { MenuItem } from 'react-bootstrap'; //Commented out to prevent console.warns
import { Link } from 'react-router-dom'; //Commented out to prevent console.warns
// import { Collapse } from 'react-bootstrap'; //Commented out to prevent console.warns
import Login from '../login/Login';
import SignupModal from "../signup/Signup"; //Commented out to prevent console.warns
//Commented out sections are waiting on routing

const alignNav = {
  display: 'inline-block',
  float: 'none',
}

const alignButton = {
  display: 'inline-block',
  float: 'none',
  borderRadius: '0%',
  backgroundColor: '#3a3a3a',
  border: 'none'
}


// const noContain = {
//   width: '100%'
// }

const primaryNav = {
    marginBottom: '0px',
    // position: 'fixed',
    width: '100%',
    borderRadius: '0%',
    paddingRight: '30px',
    paddingLeft: '30px'
}

const mySearch = {
  width: '40%',
  marginTop: '13px',
  marginLeft: '100px'
}

const secondaryNav = {
  height: '20px',
  borderColor: 'black',
  marginBottom: '0px',
  borderRadius: '0%'
}

// Commented to prevent console.warns
const navItemStyle = {
    marginBottom: '15px'
}

// const searchBar = {
//   left: '100px'
// }

const myBrand = {
  width: '100px',
  height: '100px',
  backgroundImage: 'url(https://www.pngarts.com/files/1/Game-PNG-Download-Image.png)',
  backgroundSize: '35%',
  backgroundRepeat: 'no-repeat',
  marginTop: '-7px'
}



class Header extends Component {
    //No need to declare constructor if not used (aside from super()).
    // constructor(props) {
    //   super(props)
    // }
    render() {

        console.log('HEader props',this.props)
        return ( 

    //Primary Nav
  <div>
    <Navbar style={primaryNav} inverse collapseOnSelect fluid>
    <header>
      <Navbar.Header>
        <Navbar.Brand >
          {/* E-Commerce */}
        <Link to="/"><div style={myBrand}></div></Link>
        </Navbar.Brand>
      </Navbar.Header>

      <span><input type="text" placeholder="Search" style={mySearch}></input><Button bsStyle="primary" bsSize="small" style={alignButton}>Search</Button></span>

      <Nav style={alignNav} pullRight>
        {/* Adjusted <Login /> to be able to adjust state (token,user). Set to only display if user is not logged in */}
        {/* Should have alt component show instead of text. */}
        {this.props.state.isLoggedIn === false ? <Login onTokenChange={this.props.onTokenChange} onUserChange={this.props.onUserChange}/> : 'Howdy, ' + (this.props.state.user.firstName ? this.props.state.user.firstName : this.props.state.user.email)}
        
        {this.props.state.isLoggedIn === false ? <SignupModal style={alignNav}/> : ''}
        <NavDropdown eventKey={3} title="Options" id="basic-nav-dropdown" style={alignNav}>
        <NavItem componentClass="span">
          <Link to="/gallery" style={navItemStyle}>Gallery</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Link to="/profile" style={navItemStyle}>My Profile</Link>
        </NavItem>
        <NavItem componentClass="span">
          <Button bsStyle="primary" bsSize="small" style={alignButton}>Log Out</Button>
        </NavItem>
        </NavDropdown>
      </Nav>
      </header>
      </Navbar>

  <Navbar style={secondaryNav} inverse className="hideMobile">
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