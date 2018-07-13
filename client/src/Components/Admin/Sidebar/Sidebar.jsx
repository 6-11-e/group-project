import React from 'react';
import{
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

export default class Sidebar extends React.Component {
    render(){
        return(
            <Nav vertical>
                <NavItem>
                    <NavLink href="/admin">Dashboard</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/users">Users</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/store/products">Products</NavLink>
                </NavItem>
                <NavItem>
                    <NavLink href="/admin/store/categories">Categories</NavLink>
                </NavItem>
            </Nav>
        )
    }
}