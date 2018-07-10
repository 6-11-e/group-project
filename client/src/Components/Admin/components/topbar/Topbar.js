import React from 'react';
import {Navbar, Nav, NavDropdown, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './topbar.css';

class Topbar extends React.Component {
    
    render() {
        return(
            <Navbar inverse collapseOnSelect fluid className="topbar">
                <header>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Admin
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav pullRight>
                        <NavDropdown title={this.props.username}>
                            <NavItem componentClass="span">
                                <Link to="/">Logout</Link>
                            </NavItem>
                        </NavDropdown>
                    </Nav>
                </header>
            </Navbar>
        )
    }
}

export default Topbar;