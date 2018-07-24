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
    // height: '60vh',
    // backgroundColor: 'red',
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
        this.state.primaryImage;
        this.state.data = {};
        this.state.done = false;
        this.handleAddToCart = this.handleAddToCart.bind(this)
        this.changePrimaryImage = this.changePrimaryImage.bind(this);
        // this.setValue = this.setValue.bind(this);
    }

    componentDidMount() {
        fetch('/api/store/product/name=' + this.props.match.params.id)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let data = this.state.data;
            data = response.data
            // console.log(data)
            this.setState({data})
            this.setState({primaryImage: data.product.primaryImage})
        })
        .then( () => this.setState({done: true}))
    }
    handleAddToCart(ev){
        ev.preventDefault();
        // console.log(this.state)
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        if(!cart){
            let product = this.state.data.product;
            product.qty = this.state.quantity;
            cart = {
                items: [
                    product
                ]
            }
            // let product = this.state.data.product;
            sessionStorage.setItem('cart', JSON.stringify(cart));
        } else {
            let nonMatchingItems = cart.items.filter( (cartItem) => cartItem.name !== this.state.data.product.name)
            console.log('non',nonMatchingItems);
            let matchingItems = cart.items.filter( (cartItem) => cartItem.name === this.state.data.product.name)
            console.log('match',matchingItems);
            if(matchingItems.length > 0){
                matchingItems[0].qty += parseInt(this.state.quantity, 10);
            } else {
                let product = this.state.data.product;
                product.qty = parseInt(this.state.quantity, 10);
                matchingItems.push(product)
            }
            for(let mItem of matchingItems){
                nonMatchingItems.push(mItem);
            }
            // nonMatchingItems.push(matchingItems)
            
            // cart.items = JSON.stringify(matchingItems)
            sessionStorage.setItem('cart',JSON.stringify({items: nonMatchingItems}));
        }
        // console.log(cart)
        // let matchingItems = cart.items.filter( (cartItem) => cartItem.name === this.state.data.product.name)
        // console.log(matchingItems);
        // if(matchingItems.length > 0){
        //     matchingItems[0].qty = parseInt(this.state.quantity, 10);
        // } else {
        //     let product = this.state.data.product;
        //     product.qty = parseInt(this.state.quantity, 10);
        //     matchingItems.push(product)
        // }
        // // cart.items = JSON.stringify(matchingItems)
        // sessionStorage.setItem('cart',JSON.stringify(matchingItems));

        // console.log(ev)
        // let {product} = this.state.data;
        // let formData = new FormData(ev.target)
        // // console.log('formdata', formData.get('quantity'))
        // let qty = parseInt(formData.get('quantity'));
        // // console.log('qty', qty)
        // product.qty = qty;
        // let cart = JSON.parse(sessionStorage.getItem('cart'));
        // if(cart && cart.items.length > 0){
        //     let matchingItems = cart.items.filter( (cartItem) => {
                
        //     })
        //     // for(let cartItem of cart.items){
        //     //     if(cartItem._id === product._id){
        //     //         cartItem.qty += qty
        //     //     }
        //     // }
        // } else {
        //     if(cart === null || !cart.items){
        //         cart = {}
        //         cart.items = [];
        //     }
        //     cart.items.push(product)
        // }
        // let subtotal = 0;
        // for(let cartItem of cart.items){
        //     let cartItemTotal = parseFloat((cartItem.price * cartItem.qty).toFixed(2));
        //     subtotal += cartItemTotal
        // }
        // cart.total = subtotal;
        // sessionStorage.setItem('cart', JSON.stringify(cart));
    }

    changePrimaryImage(ev){
        // console.log(ev.target)
        this.setState({primaryImage: ev.target.id})
    }
    setValue(event){
        this.setState({[event.target.name]: parseInt(event.target.value)})
    }
    render() {
        let {product} = this.state.data;
        if(this.state.done){
            return(

                <div style={mainDiv}>
                <Container fluid>
                    <Row>
                    <Col md={6}>
                    <div style={productFeature} className="prodImgs">
                        
                        <div className="productImg" style={{backgroundImage: 'url(' + `http://localhost:5000/images/products/${product._id}/${this.state.primaryImage}` + ')'}}>
                            {/* <img src={`/images/products/${product._id}/${this.state.primaryImage}`} alt="Product" className="img-responsive"/> */}
                        </div>
                        
                        <div className="productThumbs">
                            {product.images.map( (image,key) => (
                                <div className="imgThumb" key={key}>
                                    <a className="noDisplay" onClick={this.changePrimaryImage} >
                                        <div className="thumb" id={image.name} style={{backgroundImage: `url('/images/products/${product._id}/${image.name}')`}}></div>
                                        {/* <img src={`url('/images/products/${product._id}/${image.name}')`} alt="Alternate" id={image.name} className="img-responsive"/> */}
                                    </a>
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                    </Col>
                    <Col md={6}>
                        <div style={primaryProduct}>
                            <h2>{this.state.data.product.name}</h2>
                            <h4>${this.state.data.product.price}</h4>
                            <div dangerouslySetInnerHTML={{__html: this.state.data.product.description}}/>
                                {/* {this.state.data.product.description}
                            </div> */}
                            <Form onSubmit={ (event) =>  this.handleAddToCart(event)}>
                            <span><label>Qty</label><input type="number" name="quantity" onChange={ (event) => this.setValue(event)} /></span>
                            <Button type="submit">Add to cart</Button>
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