import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import{
    Container as Grid,
    Row
} from 'reactstrap'
import {ToastContainer} from 'react-toastify';
import {Elements} from 'react-stripe-elements';
// import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

//Pages
import Gallery from './pages/gallery/Gallery';
import MyJumbotron from './pages/jumbotron/Jumbotron';
import Profile from './pages/profile/Profile';
import MyProduct from './pages/product/Product';
import Cart from './pages/Cart/ShoppingCart';
import Checkout from './pages/Checkout/checkout';
import Success from './pages/Cart/Success';
import ProductsByCategory from './pages/products/byCategory';
import SearchResults from './pages/search/search';
// import './bootstrap/css/bootstrap.min.css';

class Public extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
    }
    
    render() {
        // console.log('Public.jsx Props',this.props)
        return (
            <div>
            <Header onTokenChange={this.props.onTokenChange} onUserChange={this.props.onUserChange} state={this.props.state}/>
            <Grid fluid>
                {/* Header */}
                <Row>
                    
                </Row>

                {/* Pages */}
                <Row>
                    <Route exact path='/' component={MyJumbotron}/>
                    <Route path="/gallery/:id?" render={(props) => <Gallery {...props}/>}/>
                    <Route path="/profile" component={Profile} />
                    <Route path="/cart" render={(props) => (this.state.isLoggedIn ? <Cart {...props} state={this.state} /> : <Redirect to="/"/>) } />
                    <Route path="/store/product/:id" render={(props) => <MyProduct {...props} state={this.state}/>} />
                    
                        <Elements>
                        <Route path="/checkout" render={(props) => (this.state.isLoggedIn ? <Checkout {...props} state={this.state}/>:<Redirect to="/"/>)} />
                        </Elements>

                    <Route path="/success" component={Success} />
                    <Route path="/category/:id" component={ProductsByCategory}/>
                    <Route path="/search/:query" render={(props) => <SearchResults {...props}/>}/>
                </Row>
                {/* Footer */}
                <Row>
                    <ToastContainer/>
                    <Footer />
                </Row>
            </Grid>
            </div>
        )
    }
}

export default Public;