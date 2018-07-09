import React from 'react';
import {Navbar, Nav, NavDropdown, NavItem} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import './topbar.css';
var styles = {
    topbar: {
        borderRadius: '0px',
        marginBottom: '0px'
    }
}
class Topbar extends React.Component {
    constructor(props) {
        super(props);
    }
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
                        <NavDropdown title={this.props.user.firstName}>
                            <NavItem>
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