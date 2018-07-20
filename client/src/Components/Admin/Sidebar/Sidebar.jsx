import React from 'react';
import{
    Nav,
    NavItem,
    NavLink
} from 'reactstrap';
import {NavLink as RNavLink} from 'react-router-dom'
import './style.css';

export default class Sidebar extends React.Component {
    constructor(props){
        super(props);
        this.state = {};
        this.state.menuOpen = false;
    }
    componentWillReceiveProps(nextProps){
        if(this.state.menuOpen !== nextProps.open){
            this.setState({menuOpen: !this.state.menuOpen})
        }
    }
    render(){
        console.log('SidebarStyles', window.location.pathname)
        return(
            <Nav vertical className={"sidebar" + (this.state.menuOpen ? " open": '')}>
                <NavItem className="separator">
                    <span> Main</span>
                </NavItem>
                <NavItem>
                    <NavLink to="/admin"  tag={RNavLink} exact activeClassName="active"><i className="fal fa-fw fa-tachometer"></i> Dashboard</NavLink>
                </NavItem>
                <NavItem className="separator">
                    <span> Users & Groups</span>
                </NavItem>    
                <NavItem>
                    <NavLink to="/admin/users" tag={RNavLink} activeClassName="active"><i className="fal fa-fw fa-users-cog"></i> Users</NavLink>
                </NavItem>
                <NavItem className="separator">
                    <span> Store</span>
                </NavItem>
                <NavItem>
                    <NavLink  tag={RNavLink} activeClassName="active" to="/admin/store/products"><i className="fal fa-fw fa-boxes"></i> Products</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  tag={RNavLink} activeClassName="active" to="/admin/store/categories"><i className="fal fa-fw fa-box-full"></i> Categories</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink  tag={RNavLink} activeClassName="active" to="/admin/store/orders"><i className="fal fa-fw fa-file-invoice-dollar"></i> Orders</NavLink>
                </NavItem>
                <div className="sidebarBottom">
                    <NavLink href="/logout"><i className="fal fa-fw fa-arrow-to-right"></i> Logout</NavLink>
                </div>
            </Nav>
            
        )
    }
}