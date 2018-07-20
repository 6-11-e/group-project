import React from 'react';
// import {Subscribe} from 'unstated';
// import MainContainer from '../store/main';
import {Route} from 'react-router-dom';
import Header from '../Header/Header';
import Sidebar from '../Sidebar/Sidebar';

import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css'
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
        this.state.showSideNav = false
        this.toggleSideNav = this.toggleSideNav.bind(this)
        this.getCurrentPage = this.getCurrentPage.bind(this)
        
    }
    toggleSideNav(){
        this.setState({showSideNav: !this.state.showSideNav})
    }
    getCurrentPage(){
        let path = this.props.location.pathname;
        let pathSegments = path.split('/')
        console.log('segs', pathSegments)
    }
    componentWillReceiveProps(nextProps){
        if(this.props !== nextProps){
            //eslint-disable-next-line
            this.state = nextProps.state;
            this.getCurrentPage()
        }
    }
    componentDidMount(){
        this.getCurrentPage();
    }
    render(){
        return(
            <div>  
                <Header state={this.state} toggleSideNav={this.toggleSideNav}/>
                {/* <Grid fluid> */}
                <Row noGutters>
                    <Sidebar open={this.state.showSideNav} />
                    <Col xs="12" md="10">
                        <div className="pageContainer">
                            {console.log('Admin Props: ', this.props)}
                            <Route exact path="/admin" render={(props) => <Dashboard {...props} state={this.state}/> } />
                            <Route exact path="/admin/users" render={(props) => <Users {...props} state={this.state}/>}/>
                            {/* <Route path="/admin/users/groups" render={(props) => <Groups {...props} state={this.state}/>}/> */}
                            {/* <Route path="/admin/users/group/:id" render={(props) => <Group {...props} state={this.state}/>}/> */}
                            <Route path="/admin/users/:id" render={(props) => <User {...props} state={this.state}/>}/>
                            <Route exact path="/admin/store/products" render={(props) => <Products {...props} state={this.state}/>} />
                            <Route path="/admin/store/products/edit/:id" render={(props) => <Product {...props} state={this.state}/>} />
                            <Route path="/admin/store/products/new" render={(props) => <NewProduct {...props} state={this.state} />}/>
                            <Route exact path="/admin/store/categories" render={(props) => <Categories {...props} state={this.state}/>} />
                            <Route path="/admin/store/categories/edit/:id" render={(props) => <Category {...props} state={this.state}/>} />
                            <Route path="/admin/store/categories/new" render={(props) => <NewCategory {...props} state={this.state} />}/>
                            <Route exact path="/admin/store/orders" render={(props) => <Orders {...props} state={this.state} />}/>
                            <Route path="/admin/store/orders/:id" render={(props) => <Order {...props} state={this.state} />}/>
                        </div>
                    </Col>
                </Row>
                <ToastContainer />
            {/* </Grid> */}
            </div>   
        )
    }
}

export default Admin