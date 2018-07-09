import React from 'react';
import {Nav, NavDropdown, NavItem, MenuItem} from 'react-bootstrap';
import {NavLink} from 'react-router-dom';
import './sidebar.css';

// var styles = {
//     sidebar: {
//         maxWidth: '300px',
//         // border: '1px solid black',
//         textAlign: 'left',
//         color: 'white',
//         backgroundColor: '#333'
//     },
//     navItem: {
//         paddingLeft: '5px',
//         paddingTop: '5px',
//         paddingBottom: '5px',
//         width: '100%'
//     },
//     link: {
//         width: '100%'
//     }
// }
class Sidebar extends React.Component {
    constructor() {
        super()
        // this.activeLink = this.activeLink.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
        this.handleDropdown = this.handleDropdown.bind(this)
    }
    state = {
        activeKey: 1,
        storeDropdownOpen: false
    }

    handleSelect(key, event) {
        this.setState({activeKey: key});
        
    }
    handleDropdown() {
        //THIS IS RIDICULOUS! JUST GET RID OF DROPDOWN MENU. USE HEADERS/SPANS/SEPARATOR INSTEAD
        return this.setState({storeDropdownOpen: !this.storeDropdownOpen})
    }
    render() {
        return (
            <div className="sidebar">
                <Nav stacked activeKey={this.state.activeKey} onSelect={this.handleSelect}>
                    <NavItem componentClass="span" ref="dashboard" eventKey={1}>
                        <NavLink exact to="/admin"><i className='fal fa-chart-line fa-fw fa-lg'></i> Dashboard</NavLink>
                    </NavItem>
                    <NavItem componentClass="span" ref="users" eventKey={2}>
                        <NavLink to="/admin/users"><i className='fal fa-users-cog fa-fw fa-lg'></i> Users</NavLink>
                    </NavItem>
                    <NavItem componentClass="span" disabled>
                        <i className='fal fa-store fa-fw fa-lg'></i> Store
                    </NavItem>
                    <NavItem componentClass="span" eventKey={3}>
                    <NavLink to="/admin/store/products"><i className="fal fa-boxes fa-lg fa-fw"></i> Products</NavLink>
                    </NavItem>
                    
                </Nav>
            </div>
        )
    }
}

export default Sidebar;

{/* <Nav style={styles.sidebar}>
                    <NavItem componentClass="span" style={styles.navItem}>
                        <Link to="/admin" style={styles.link}>Dashboard</Link>
                    </NavItem>
                    <NavItem componentClass="span" style={styles.navItem}>
                        <Link to="/admin/users">Users</Link>
                    </NavItem>
                </Nav> */}