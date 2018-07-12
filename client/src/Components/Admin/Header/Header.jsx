import React from 'react';
import {Subscribe} from 'unstated';
import MainContainer from '../store/main';
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

export default class Header extends React.Component {
    constructor(props){
        super(props)
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        }
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        return(
            
            <Subscribe to={[MainContainer]}>
                {main => {
                let state = main.state;
                return(
                    <Navbar dark expand="md" color="dark">
                    <NavbarBrand href="/admin">Admin</NavbarBrand>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            <UncontrolledDropdown nav inNavbar>
                                <DropdownToggle nav caret>
                                    <span>{state.user.firstName}</span>
                                </DropdownToggle>
                                <DropdownMenu right>
                                    <DropdownItem>
                                        Logout
                                    </DropdownItem>
                                </DropdownMenu>
                            </UncontrolledDropdown>
                        </Nav>
                    </Collapse>
                </Navbar>
            
                )}}
            </Subscribe>    
            
        )
        
    }
}