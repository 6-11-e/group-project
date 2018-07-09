import React, { Component } from 'react';
import { Pager } from 'react-bootstrap'
// import { Link } from 'react-router-dom';
import Products from './Store/Products'

// const primaryContainer = {
//     float: 'right'
// }

// const noContain = {
//     width: '84%',
//     marginRight: '0'
// }

// const itemContainerMain = {
//     // display: 'flex',
//     // justifyContent: 'flex-end',
//     marginRight: '50px'
// }

// const itemContainer = {
//     // display: 'flex',
//     // justifyContent: 'flex-end',
//     // width: '75%',
//     marginTop: '0px',
//     marginRight: '5px'
// }

const navContainer = {
    width: '15%',
    // position: 'fixed',
    marginTop: '40px',
    listStyleType: 'none',
    lineHeight: '60px',
    height: '150vh',
    float: 'left',
    borderRight: 'solid gray 1px'
}

const ulContainer = {
    listStyleType: 'none',
    // height: '100vh'
    // float: 'left',
    // marginLeft: '20px'
    paddingRight: '30px'
}

// const myItem = {
//     width: '100%',
//     height: '250px',
//     backgroundColor: '#3a3a3a',
//     margin: '50px 10px 10px 10px',
//     color: 'white'
// }

// const divider = {
//     backgroundColor: 'black',
//     width: '5px',
//     height: '1000px'
// }

// const API = '/api/store/products';


class Gallery extends Component {

    render() {
        return (
        <div>
                <div>
                </div>
                <div style={navContainer}>
                    <ul style={ulContainer}>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                        <li><a>SubCategory</a></li>
                    </ul>
                </div>
            {/* <Grid style={noContain}>
            <Row> */}
                {/* <div style={primaryContainer}> */}
                {/* <div style={itemContainerMain}>
                    <div style={itemContainer}> */}
                        <Products />
                    {/* <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    </div> 
                </div>
                <div style={itemContainerMain}>
                    <div style={itemContainer}>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    </div> 
                </div>
                <div style={itemContainerMain}>
                    <div style={itemContainer}>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col>
                    <Col xs={12} sm={6} md={3}>
                        <Link to="/product"><h4 style={myItem}>Product</h4></Link>
                    </Col> */}
                    {/* </div> 
                </div> */}
                {/* </div> */}
                {/* </Row> */}
                <Pager>
                    <Pager.Item href="#">Previous</Pager.Item>{' '}
                    <Pager.Item href="#">Next</Pager.Item>
                </Pager>
            {/* // </Grid> */}
        </div>
        )
    }
}

export default Gallery;