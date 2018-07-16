import React from 'react';
import{
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    UncontrolledDropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem,
    Collapse
} from 'reactstrap'
import {Link} from 'react-router-dom';
import HeaderStyle from './style.css';

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state
        this.toggle = this.toggle.bind(this);
        this.state.isOpen = false
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(
            <Navbar dark expand="md" color="dark">
                <NavbarBrand href="/admin">Admin</NavbarBrand>
                <NavbarToggler onClick={this.props.toggleSideNav} />
                <Collapse isOpen={this.state.isOpen} navbar>
                    <Nav className="ml-auto" navbar>
                        <UncontrolledDropdown nav inNavbar className="userDropdown">
                            <DropdownToggle nav caret>
                                <span>{this.state.user.firstName}</span>
                            </DropdownToggle>
                            <DropdownMenu right>
                                <DropdownItem>
                                    <Link to="/">Frontend <i className="fal fa-fw fa-home"></i></Link>
                                </DropdownItem>
                                <DropdownItem>
                                    <Link to="/logout">Logout <i className="fal fa-fw fa-arrow-to-right"></i></Link>
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>        
        )
        
    }
}