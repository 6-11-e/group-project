import React from 'react';
import {Subscribe} from 'unstated';
import MainContainer from '../store/main';
import {Route} from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';
import 'bootstrap/dist/css/bootstrap.min.css'
import{
    Container as Grid,
    Row,
    Col
} from 'reactstrap';

import './Admin.css';
//Components
import Dashboard from './Dashboard/Dashboard';
import Users from './Users/Users'
import User from './User/User'
import Products from './Products/Products';
import Product from './Product/Product';
import Categories from './Categories/Categories';
import Category from './Category/Category';
let Admin = class extends React.Component {
    
    render(){
        return(
            <Subscribe to={[MainContainer]}>
                {mainContainer => (
                    <div>  
                    <Header/>
                    {/* <Grid fluid> */}
                        <Row noGutters>
                            <Col xs="12" md="2" className="sideNav">
                                <Sidebar />
                            </Col>
                            <Col xs="12" md="10">
                                <Route exact path="/admin" render={(props) => <Dashboard {...props} state={mainContainer.state}/> } />
                                <Route path="/admin/users" render={(props) => <Users {...props} state={mainContainer.state}/>}/>
                                <Route path="/admin/user/:id" render={(props) => <User {...props} state={mainContainer.state}/>}/>
                                <Route path="/admin/store/products" render={(props) => <Products {...props} state={mainContainer.state}/>} />
                                <Route path="/admin/store/product/edit/:id" render={(props) => <Product {...props} state={mainContainer.state}/>} />
                                <Route path="/admin/store/categories" render={(props) => <Categories {...props} state={mainContainer.state}/>} />
                                <Route path="/admin/store/category/edit/:id" render={(props) => <Category {...props} state={mainContainer.state}/>} />
                                {/* {mainContainer.state.token}
                            <button onClick={ () => mainContainer.updateUser({firstName: 'NewTest', lastName: 'User'}) }>
                            Change Token in state
                            </button> */}
                            </Col>
                        </Row>
                    {/* </Grid> */}
                    </div>
                )}
            </Subscribe>
            
        )
    }
}

export default Admin