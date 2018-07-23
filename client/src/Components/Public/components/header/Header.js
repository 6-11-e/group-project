import React, { Component } from "react";
import{
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  DropdownItem,
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  Input,
  InputGroup,
  InputGroupAddon,
  Badge,
  Form
} from 'reactstrap'
// import { Navbar, Button} from 'react-bootstrap';
// import { Nav } from 'react-bootstrap';
// import { NavItem } from 'react-bootstrap';
// import { NavDropdown } from 'react-bootstrap';
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

// const alignButton = {
//   display: 'inline-block',
//   float: 'none',
//   borderRadius: '0%',
//   backgroundColor: '#3a3a3a',
//   border: 'none'
// }


// const noContain = {
//   width: '100%'
// }

const primaryNav = {
    marginBottom: '0px',
    // position: 'fixed',
    width: '100%',
    borderRadius: '0%',
    // paddingRight: '30px',
    // paddingLeft: '30px'
}

// const mySearch = {
//   width: '40%',
//   marginTop: '13px',
//   marginLeft: '100px'
// }

const secondaryNav = {
  // height: '20px',
  // borderColor: 'black',
  // marginBottom: '0px',
  // borderRadius: '0%'
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'space-between',
  color: '#fff'
}

// Commented to prevent console.warns
const navItemStyle = {
    marginBottom: '15px'
}

// const searchBar = {
//   left: '100px'
// }

// const myBrand = {
//   width: '100px',
//   height: '100px',
//   backgroundImage: 'url(https://www.pngarts.com/files/1/Game-PNG-Download-Image.png)',
//   backgroundSize: '35%',
//   backgroundRepeat: 'no-repeat',
//   marginTop: '-7px'
// }

const myInput = {
  // width: '50%',
  margin: '0 auto',
  paddingLeft: '10%',
  marginRight: '0'
}

const buttonBox = {
  marginLeft: '5px'
}

class Header extends Component {
    //No need to declare constructor if not used (aside from super()).
    constructor(props) {
      super(props)
      this.state = this.props.state;
      this.handleSearch = this.handleSearch.bind(this)
      this.calcCartQuantity = this.calcCartQuantity.bind(this)
      this.state.cartCount = 0;
      // console.log(this.props)
    }
    componentWillMount(){
      this.calcCartQuantity();
    }
    handleSearch(ev){
      ev.preventDefault();
      let query = new FormData(ev.target);
      query = query.get('search')
      // console.log(this.props.history)
      window.location = 'http://localhost:3000/search/'+encodeURIComponent(query);
    }
    calcCartQuantity(){
      let count = 0;
      if(this.state.cart){
        if(this.state.cart.items){
          
          for(let item of this.state.cart.items){
            count += item.qty
          }
        }
      }
      this.setState({cartCount: count});
    }
    render() {

        // console.log('HEader props',this.props)
        return ( 

    //Primary Nav
  <div>
    <Navbar style={primaryNav} dark expand="md" color="dark">
        <NavbarBrand href="/">
          <img src="/images/ecLogo_40.png" alt="Site Logo"/>
        </NavbarBrand>
        <Form onSubmit={this.handleSearch} style={{width: '50%', margin: '0 auto', paddingLeft: '10%', marginRight: '0'}}>
        <InputGroup style={myInput}>
          <Input type="text" placeholder="Search..." bsSize="sm" name="search"/>
          <InputGroupAddon addonType="append">
            <Button color="secondary">Go</Button>
          </InputGroupAddon>
        </InputGroup>
        </Form>
        

      {/* <span><input type="text" placeholder="Search" style={mySearch}/><Button bsStyle="primary" bsSize="small" style={alignButton}>Search</Button></span> */}

      <Nav style={alignNav} className="ml-auto">
        {/* Adjusted <Login /> to be able to adjust state (token,user). Set to only display if user is not logged in */}
        {/* Should have alt component show instead of text. */}
        {this.props.state.isLoggedIn === false ? (
          <div>
            <Login onTokenChange={this.props.onTokenChange} onUserChange={this.props.onUserChange}/>
            <SignupModal style={alignNav}/>
            <Button href="/cart" outline color="secondary" size="sm" style={buttonBox}>Cart <i class="fal fa-shopping-cart"></i> <Badge></Badge></Button>
          </div>
        ) : (
          <div>
            <Button href="/cart" outline color="secondary" size="sm" style={buttonBox}>Cart <i className="fal fa-shopping-cart"></i> <Badge>{this.state.cartCount}</Badge></Button>
            
            <UncontrolledDropdown id="basic-nav-dropdown" style={alignNav} nav inNavbar>
              <DropdownToggle nav caret>
                {this.props.state.user.firstName}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem>
                  <Link to="/gallery" style={navItemStyle}>Gallery</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/profile" style={navItemStyle}>My Profile</Link>
                </DropdownItem>
                <DropdownItem>
                  <Link to="/logout">Logout</Link>
                </DropdownItem>
              </DropdownMenu>
              
            </UncontrolledDropdown>
          </div>
        )}
      </Nav>
      {/* </header> */}
      </Navbar>
      {/* style={secondaryNav} className="hideMobile" */}
    {/* <Navbar  dark color="dark" expand="md">
    
      <Nav navbar className="mx-auto" style={secondaryNav}>
          <NavItem>
            <NavLink href="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="/gallery">Gallery</NavLink>
          </NavItem>
      </Nav>

  </Navbar> */}
</div>
    )
}
}



export default Header;

