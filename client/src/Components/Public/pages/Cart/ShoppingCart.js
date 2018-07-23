import React from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import {Link} from 'react-router-dom';
// import Product from '../../../Admin/Pages/Product/Product';
import './style.css';

const demoCol = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    display: 'flex',
    flexDirection: 'column'
}

// const itemSpans = {
//     display: 'flex',
//     flexDirection: 'column',
//     alignItems: 'flex-end'
// }

const mySpan = {
    display: 'flex',
    justifyContent: 'space-between'
}

const orderSummary = {
    marginBottom: '100px'
}

const demoCol2 = {
    textAlign: 'left',
    border: 'solid 1px gray',
    height: 'auto',
    // margin: '25px',
    padding: '15px',
    marginTop: '20px'
}


const borderBottom = {
    // borderBottom: 'solid 1px black'
}

// const photoDemo = {
//     width: '100px',
//     height: '100px',
//     backgroundColor: 'black',
// }

// const itemStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     margin: '10px 10px 10px 0px',
//     justifyContent: 'space-between'
// }

const listStyle = {
    listStyle: 'none',
    padding: '0px'
}

class Cart extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
        if(!this.state.cart){
            this.state.cart = {}
        }
        // this.state.cart = {};
        this.state.totals = {};
        this.getCart = this.getCart.bind(this);
        this.validateCart = this.validateCart.bind(this)
        this.prepareCartDisplay = this.prepareCartDisplay.bind(this);
        this.updateTotals = this.updateTotals.bind(this);

        // console.log(this.state)
    }
    getCart(){
        let cart = this.state.cart
        if (Object.keys(cart).length !== 0){
            console.log('Cart exists in state')
            this.validateCart(cart)
        } else {
            cart = JSON.parse(sessionStorage.getItem('cart'));
            this.validateCart()
        }
        // this.validateCart(cart)
        // console.log('Cart: ', cart)
        // this.setState({cart})
    }
    validateCart(cart){
        // cart = JSON.parse(cart)
        console.log('GET CART: ', cart)

        fetch('/api/store/validateCart', {
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cart),
            method: 'POST'
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText;
        })
        .then( response => {
            if(response.status === 'ok'){
                let {cart} = this.state;
                cart = response.data.cart
                this.setState({cart})
            }
        })
        .then( () => this.updateTotals())
        .then( () => sessionStorage.setItem('cart',JSON.stringify(this.state.cart)))
        //connect to API, send cart data, get verified cart back. Contains product imgs and price data
    }
    updateTotals(){
        let taxRate = 0.06; //Should be configurable later in db.
        let shipping = 12.99; //Dummy for flat-rate
        let cartTotal = parseFloat(this.state.cart.total);
        console.log(cartTotal)
        let tax = parseFloat((cartTotal * taxRate).toFixed(2));
        let {totals} = this.state;
        totals.tax = tax;
        totals.shipping = shipping;
        totals.subtotal = cartTotal;
        totals.grandTotal = parseFloat((tax + shipping + cartTotal).toFixed(2));
        this.setState({totals});

    }
    componentWillMount(){
        this.getCart()
    }
    prepareCartDisplay(){
        
            // console.log(cartItems)
            // this.setState({cartDisplay: cartItems})
        
    }
    render() {
        let cartItems = '';
        if(this.state.cart && this.state.cart.items){
            cartItems = this.state.cart.items.map( (product, key) => (
                <li key={key}>
                    <div className="cartItem">
                        <div className="itemImage">
                            {product.primaryImage ? (
                                //Show Product Image
                                <img src={`/images/products/${product._id}/${product.primaryImage}`} alt="Product" className="img-responsive"/>
                            ):(
                                //Show placeholder image
                                <img src="https://placehold.it/400&text=No%20Image" alt="Product" className="img-responsive"/>
                            )}
                        </div>
                        <div className="itemInfo">
                            <h4 className="itemName">{product.name}</h4>
                            <p><input type="text" defaultValue={product.qty}/></p>
                            <p className="itemPriceTotal">${parseFloat((product.price * product.qty).toFixed(2))}</p>

                        </div>
                    </div>
                </li> 
            ))
            console.log('cartItems', cartItems)
        } else {
            cartItems = '';
        }
        return (
            <Container fluid>
                <h1>Cart</h1>
                <Row>
                    <Col xs="12" md="8">
                        <div style={demoCol}>
                            <ul style={listStyle} className="shoppingList">
                                {cartItems}
                                {/* <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 2</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 3</h4><p>$9.99</p></span>
                                    </div>
                                </li>
                                <li style={borderBottom}>
                                    <div style={itemStyle}>
                                        <div style={photoDemo}></div>
                                        <span style={itemSpans}><h4>Demo Item 4</h4><p>$9.99</p></span>
                                    </div>
                                </li> */}
                            </ul>
                            <div className="formButtons">
                                <Button>Empty Cart</Button>
                                <Button>Update Quantities</Button>
                            </div>
                        </div>
                    </Col>
                    <Col xs="12" md="4">
                        <div style={demoCol}>
                            <h4 style={borderBottom}>Order Summary</h4>
                            <div style={orderSummary}>
                            <span style={mySpan}><p style={borderBottom}>Subtotal:</p><p>${this.state.totals.subtotal ? this.state.totals.subtotal:''}</p></span>
                            <span style={mySpan}><p style={borderBottom}>Shipping:</p><p>${this.state.totals.shipping ? this.state.totals.shipping:''}</p></span>
                            <span style={mySpan}><p style={borderBottom}>Estimated Tax:</p><p>${this.state.totals.tax ? this.state.totals.tax:''}</p></span>
                            <span style={mySpan}><p style={borderBottom}>Order Total:</p><p>${this.state.totals.grandTotal ? this.state.totals.grandTotal:''}</p></span>
                            </div>
                            <Link to="/checkout"><Button color="primary" block>Checkout</Button></Link>
                        </div>
                    </Col>
                </Row>
                <h4>Related Products</h4>
                <Row>
                    <Col md="4">
                        <div style={demoCol2}>

                        </div>
                    </Col>
                    <Col md="4">
                        <div style={demoCol2}>
                        </div>
                    </Col>
                    <Col md="4">
                        <div style={demoCol2}>
                        </div>
                    </Col>
                </Row>
            </Container>
        )
    }
}

export default Cart;