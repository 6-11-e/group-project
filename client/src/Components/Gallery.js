import React, { Component } from 'react';
import { Button } from 'react-bootstrap'

const primaryContainer = {
}

const itemContainerMain = {
    display: 'flex',
    justifyContent: 'flex-end',
    marginRight: '50px'
}

const itemContainer = {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '75%',
    marginTop: '0px'
}

const navContainer = {
    width: '20%',
    position: 'fixed',
    marginTop: '40px',
    listStyleType: 'none',
    lineHeight: '40px'
}

const ulContainer = {
    listStyleType: 'none'
}

const myItem = {
    width: '100%',
    height: '250px',
    backgroundColor: 'red',
    margin: '50px 20px 20px 20px'
}

const divider = {
    backgroundColor: 'black',
    width: '5px',
    height: '500px'
}

class Gallery extends Component {
    render() {
        return (
            <div>
                <div>
                </div>
                <div style={navContainer}>
                    <ul style={ulContainer}>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                        <li><a>Category</a></li>
                    </ul>
                </div>
                <div style={itemContainerMain}>
                    <div style={itemContainer}>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                    </div> 
                </div>
                <div style={itemContainerMain}>
                    <div style={itemContainer}>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                    </div> 
                </div>
                <div style={itemContainerMain}>
                    <div style={itemContainer}>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                        <div style={myItem}>
                            <h4>Product</h4>
                        </div>
                    </div> 
                </div>
            </div>
        )
    }
}

export default Gallery;