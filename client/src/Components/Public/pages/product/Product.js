import React from 'react';
// import { Grid, Row, Col, Button } from 'react-bootstrap';
import 'constants';
// import Products from '../components/Products';
import { Container, Row, Col, Button, Form } from 'reactstrap';
import './style.css'

const mainDiv = {
    width: '100%',
    // height: '80vh',
    backgroundColor: 'white'
}

const primaryProduct = {
    height: '66vh',
    // width: '80%',
    // float: 'right'
    textAlign: 'left',
    backgroundColor: 'whitesmoke',
    padding: '50px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly'
}

// const noContain = {
//     width: '100%'
// }

const productFeature = {
    height: '60vh',
    // width: '40%',
    margin: '40px 0px 40px 0px',
    // float: 'left'
}

const relatedProducts = {
    height: '250px',
    backgroundColor: 'black',
    // border: 'solid whitesmoke 4px',
    marginTop: '25px',
    marginBottom: '25px'
}

const buttonStyle = {
    width: '100%',
    marginTop: '25px'
}

class MyProduct extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = this.props.state;
        // this.state = {
        //     data: {

        //     },
        //     done: false
        // }
        this.state.data = {};
        this.state.done = false;
        this.handleAddToCart = this.handleAddToCart.bind(this)
    }

    componentDidMount() {
        fetch('/api/store/product/name=' + this.props.match.params.id)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let data = this.state.data;
            data = response.data
            console.log(data)
            this.setState({data})
        })
        .then( () => this.setState({done: true}))
    }
    handleAddToCart(ev){
        ev.preventDefault();
        let {product} = this.state.data;
        let formData = new FormData(ev.target)
        // console.log('formdata', formData.get('quantity'))
        let qty = parseInt(formData.get('quantity'));
        // console.log('qty', qty)
        product.qty = qty;
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        if(cart && cart.items.length > 0){
            for(let cartItem of cart.items){
                if(cartItem._id === product._id){
                    cartItem.qty += qty
                }
            }
        } else {
            if(cart === null || !cart.items){
                cart = {}
                cart.items = [];
            }
            cart.items.push(product)
        }
        let subtotal = 0;
        for(let cartItem of cart.items){
            let cartItemTotal = parseFloat((cartItem.price * cartItem.qty).toFixed(2));
            subtotal += cartItemTotal
        }
        cart.total = subtotal;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }
    render() {
        let {product} = this.state.data;
        if(this.state.done){
            return(

                            <div style={mainDiv}>
                            <Container fluid>
                                <Row>
                                <Col md={6}>
                                <div style={productFeature}>
                                    <img src={`/images/products/${product._id}/${product.primaryImage}`} alt="Product"/>
                                    <div className="productThumbs">
                                        {/* {product.images.map( (image,key) => (
                                            <div className="imgThumb" key={key}>
                                                <img src={`/images/products/${product._id}/${image.name}`} alt="Alternate" className="img-responsive"/>
                                            </div>
                                        ))} */}
                                    </div>
                                </div>
                                </Col>
                                <Col md={6}>
                                    <div style={primaryProduct}>
                                        <h2>{this.state.data.product.name}</h2>
                                        <h4>${this.state.data.product.price}</h4>
                                        <p>{this.state.data.product.description}</p>
                                        <Form onSubmit={this.handleAddToCart}>
                                        <span><label>Qty</label><input type="number" name="quantity" defaultValue="1" /></span>
                                        <br/>
                                        <Button color='primary' type="submit" style={buttonStyle}>Add to cart</Button>
                                        </Form>
                                    </div>
                                 </Col>
                                 </Row>
                                 <h3>Related Products</h3>
                                 <Row>
                                 <Col sm={4}>
                                     <div style={relatedProducts}>
            
                                     </div>
                                 </Col>
                                 <Col sm={4}>
                                     <div style={relatedProducts}>
                                        
                                     </div>
                                 </Col>
                                 <Col sm={4}>
                                     <div style={relatedProducts}>
                                        
                                     </div>
                                 </Col>
                                 </Row>
                             </Container>
                         </div>
            
            )
        } else {
            return(
                <div>
                    
                </div>
            )
        }
    }

}
export default MyProduct;