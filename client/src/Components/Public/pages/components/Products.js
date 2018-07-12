import React from 'react';
// import { Button, Grid, Row, Col, Nav, NavDropdown, NavItem, Pager } from 'react-bootstrap'
import { Link } from 'react-router-dom';

const productBlocks = {
    width: '20%',
    height: '250px',
    border: '1px solid gray',
    margin: '25px',
    padding: '10px',
    display: 'inline-block'
}

let api = '/api/store/products/12'


class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }

    componentDidMount() {

        fetch(api)
        .then(response => {
            return response.json();
        }).then(data => {
            let products = data.map((products, id) => {
                console.log(products)
                return (
                    <Link to={"/store/product/" + encodeURIComponent(products.name)}>
                    <div key={products._id} style={productBlocks}>
                        <h4>{products.name}</h4>
                        <p>{products.price}</p>
                    </div>
                    </Link>
                )
            })
            this.setState({products});
            })
    }
    render() {
        return(
            <div>
                {this.state.products}
            </div>
        )
    }
}

export default Products;