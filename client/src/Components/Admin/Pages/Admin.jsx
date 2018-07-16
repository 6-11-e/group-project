import React from 'react';
// import {Subscribe} from 'unstated';
// import MainContainer from '../store/main';
import {Route} from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
import{
    Container as Grid,
    Row,
    Col
} from 'reactstrap';

import './Admin.css';
//Components
import Dashboard from './Dashboard/Dashboard';
import Users from './users/Users'
import User from './User/User'
// import Groups from './Groups/Groups'
// import Group from './Group/Group'
import Products from './Products/Products';
import Product from './Product/Product';
import NewProduct from './NewProduct/NewProduct';
import Categories from './Categories/Categories';
import Category from './Category/Category';
import NewCategory from './NewCategory/NewCategory';
import Orders from './Orders/Orders';
import Order from './Order/Order';
let Admin = class extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state
    }
    render(){
        return(
            <div>  
                <Header state={this.state}/>
                {/* <Grid fluid> */}
                <Row noGutters>
                    <Col xs="12" md="2" className="sideNav">
                        <Sidebar />
                    </Col>
                    <Col xs="12" md="10">
                        <Route exact path="/admin" render={(props) => <Dashboard {...props} state={this.state}/> } />
                        <Route exact path="/admin/users" render={(props) => <Users {...props} state={this.state}/>}/>
                        {/* <Route path="/admin/users/groups" render={(props) => <Groups {...props} state={this.state}/>}/> */}
                        {/* <Route path="/admin/users/group/:id" render={(props) => <Group {...props} state={this.state}/>}/> */}
                        <Route path="/admin/user/:id" render={(props) => <User {...props} state={this.state}/>}/>
                        <Route exact path="/admin/store/products" render={(props) => <Products {...props} state={this.state}/>} />
                        <Route path="/admin/store/product/edit/:id" render={(props) => <Product {...props} state={this.state}/>} />
                        <Route path="/admin/store/product/new" render={(props) => <NewProduct {...props} state={this.state} />}/>
                        <Route path="/admin/store/categories" render={(props) => <Categories {...props} state={this.state}/>} />
                        <Route path="/admin/store/category/edit/:id" render={(props) => <Category {...props} state={this.state}/>} />
                        <Route path="/admin/store/category/new" render={(props) => <NewCategory {...props} state={this.state} />}/>
                        <Route path="/admin/store/orders" render={(props) => <Orders {...props} state={this.state} />}/>
                        <Route path="/admin/store/order/:id" render={(props) => <Order {...props} state={this.state} />}/>
                    </Col>
                </Row>
                <ToastContainer />
            {/* </Grid> */}
            </div>   
        )
    }
}

export default Admin