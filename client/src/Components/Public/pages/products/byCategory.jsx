import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container as Grid,
    Row,
    Col
} from 'reactstrap';

export default class ProductsByCategory extends React.Component {
    constructor(props){
        super(props)
        this.state = {}
        this.state.products = [];
        this.getProducts = this.getProducts.bind(this)
        this.state.done = false
    }
    componentWillMount(){
        this.getProducts()
    }
    getProducts(){
        fetch(`/api/store/products/category/${this.props.match.params.id}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText
        })
        .then( response => {
            let {products} = this.state;
            products = response.data.products;
            let count = response.data.count;
            this.setState({products, count, done: true});
            console.log('response', response.data)
        })
    }
    render(){
        if(this.state.done === true){
            console.log(this.state.products)
            var products = this.state.products.map( (product, key) => (
                
                <Col xs={12} md={4} key={key}>
                    <Link to={`/store/product/${encodeURIComponent(product.name)}`}>
                    <div className="product">
                        <h4 className="productTitle">{product.name}</h4>
                        <img src={`/images/products/${product._id}/${product.primaryImage}`} className="img-responsive" alt={product.name}/>
                    </div>
                    </Link>
                </Col>
            ))
            console.log(products)
            return(
                <Grid>
                    <Row>
                        {products}
                    </Row>
                </Grid>
            )
        } else {
            return ' h';
        }
        
    }
}