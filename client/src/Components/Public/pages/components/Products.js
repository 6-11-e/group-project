import React from 'react';
import { Link } from 'react-router-dom';
// import { Container, Row, Col, Button } from 'reactstrap';


const productBlocks = {
    width: '20%',
    height: '250px',
    border: '1px solid gray',
    margin: '20px',
    padding: '20px',
    paddingTop: '20px',
    display: 'inline-block',
    verticalAlign: 'top'
}

// let api = '/api/store/products/9'


class Products extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
        this.state.perPage = 9;
        this.state.page = 1;
    }

    componentDidMount() {

        fetch(`/api/store/products/${this.state.perPage}/${this.state.page}`)
        .then(response => {
            return response.json();
        }).then(data => {
            // console.log(data.data)
            let products = data.data.map((product, id) => {
                // console.log(products)
                return (
                    <Link to={"/store/product/" + encodeURIComponent(product.name)} key={id}>
                    <div key={product._id} style={productBlocks}>
                        <h6>{product.name}</h6>
                        <p>${product.price}</p>
                        <img src={`/images/products/${product._id}/${product.primaryImage}`} className="img-responsive"/>
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