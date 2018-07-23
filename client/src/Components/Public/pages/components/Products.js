import React from 'react';
import { Link } from 'react-router-dom';
import {Button } from 'reactstrap';


const productBlocks = {
    width: '200px',
    height: '250px',
    border: '1px solid gray',
    margin: '20px',
    padding: '20px',
    paddingTop: '20px',
    display: 'inline-block',
    verticalAlign: 'top'
}

const productsDiv = {
    // maxWidth: '1200px'
}

// let api = '/api/store/products/9'


class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
            page: 1
        };
        this.state.perPage = 9;
        this.handleClick = this.handleClick.bind(this);
    }

    
    componentDidMount() {
        console.log(this.state)
        fetch(`/api/store/products/${this.state.perPage}/${this.state.page}`)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log(data.data)
            let products = data.data.map((product, id) => {
                // console.log(products)
                return (
                    <Link to={"/store/product/" + encodeURIComponent(product.name)} key={id}>
                    <div key={product._id} style={productBlocks} className="grid-container">
                        <h6>{product.name}</h6>
                        <p>${product.price}</p>
                        <div>
                        <img src={`/images/products/${product._id}/${product.primaryImage}`} className="img-responsive"/>
                        </div>
                    </div>
                    </Link>
                )
            })
            console.log(this.state)
            this.setState({products});
            })
    }

    handleClick() {
        this.setState(prevState => ({
            page: prevState.page++
        }));
    }



    render() {
        return(
            <div>
            <div>
                {this.state.products}
            </div>
            <span><Button onClick={this.handleClick}>Previous</Button><Button onClick={this.handleClick}>Next</Button></span>
            </div>
        )
    }
}

export default Products;