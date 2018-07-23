import React from 'react';
import {Link} from 'react-router-dom';
import {
    Container as Grid,
    Row,
    Col
} from 'reactstrap';
import Categories from '../components/Categories';

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
        this.setState({done: false})
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
    componentWillReceiveProps(nextProps){
        if(nextProps !== this.props){
            this.getProducts()
        }
    }
    render(){
        if(this.state.done){
            console.log(this.state.products)
            var products = this.state.products.map( (product, key) => (
                
                <Col xs={12} md={4} key={key}>
                    <Link to={`/store/product/${encodeURIComponent(product.name)}`}>
                        <div key={product._id} className="grid-container">
                            <div className="productImage" style={{backgroundImage: `url('/images/products/${product._id}/${product.primaryImage}')`}}>
                                <h6 className="productTitle">{product.name}</h6>
                                <span className="productPrice">${product.price}</span>
                            </div>
                        </div>
                    </Link>
                </Col>
            ))
            console.log(products)
            return(
                <Grid fluid>
                    <Row>
                        <Col md={2} className="hideMobile mainSidebar">
                            <Categories activeCategory={this.props.match.params.id}/>
                        </Col>
                        <Col xs={12} md={10}>
                            <h2 style={{marginTop: '0.9rem'}}>Gallery</h2>
                            <hr/>
                            <Row>
                            {products}
                            </Row>
                            
                        </Col>
                        
                    </Row>
                </Grid>
            )
        } else {
            return(
                <div className="loadDisplay">
                    <h3>Loading...</h3>
                </div>
            )
        }
        
    }
}