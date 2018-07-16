import React from 'react';
import {Route} from 'react-router-dom';
import{
    Container as Grid,
    Row
} from 'reactstrap'
import {ToastContainer, toast} from 'react-toastify';
// import {Grid, Col, Row} from 'react-bootstrap';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';

//Pages
import Gallery from './pages/gallery/Gallery';
import MyJumbotron from './pages/jumbotron/Jumbotron';
import Profile from './pages/profile/Profile';
import MyProduct from './pages/product/Product';
import Cart from './pages/Cart/ShoppingCart';
// import './bootstrap/css/bootstrap.min.css';
class Public extends React.Component {
    
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
                    <Route path="/gallery" component={Gallery}/>{/* Maybe products so url reads 'example.com/products/'. Gallery does have a nice ring though.*/}
                    <Route path="/profile" component={Profile} />
                    <Route path="/cart" component={Cart} />
                    <Route path="/store/product/:id" component={MyProduct} /> {/* */}
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