import React from 'react';
import {
    Container as Grid,
    Row,
    Col,
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    Form,
    FormGroup,
    Input,
    Label,
    Fade,
    Button
} from 'reactstrap';
import './style.css';
import {injectStripe, CardNumberElement, CardExpiryElement, CardCVCElement} from 'react-stripe-elements';
import { toast } from 'react-toastify';
// import StripeCheckout from 'react-stripe-checkout';



class Checkout extends React.Component {
    states = [
        {abbr: 'AL', name: 'Alabama'},
        {abbr: 'AK', name: 'Alaska'},
        {abbr: 'AZ', name: 'Arizona'},
        {abbr: 'AR', name: 'Arkansas'},
        {abbr: 'CA', name: 'California'},
        {abbr: 'CO', name: 'Colorado'},
        {abbr: 'CT', name: 'Connecticut'},
        {abbr: 'DE', name: 'Delaware'},
        {abbr: 'FL', name: 'Florida'},
        {abbr: 'GA', name: 'Georgia'},
        {abbr: 'HI', name: 'Hawaii'},
        {abbr: 'ID', name: 'Idaho'},
        {abbr: 'IL', name: 'Illinois'},
        {abbr: 'IN', name: 'Indiana'},
        {abbr: 'IA', name: 'Iowa'},
        {abbr: 'KS', name: 'Kansas'},
        {abbr: 'KY', name: 'Kentucky'},
        {abbr: 'LA', name: 'Louisiana'},
        {abbr: 'ME', name: 'Maine'},
        {abbr: 'MD', name: 'Maryland'},
        {abbr: 'MA', name: 'Massachusetts'},
        {abbr: 'MI', name: 'Michigan'},
        {abbr: 'MN', name: 'Minnesota'},
        {abbr: 'MS', name: 'Mississippi'},
        {abbr: 'MO', name: 'Missouri'},
        {abbr: 'MT', name: 'Montana'},
        {abbr: 'NE', name: 'Nebraska'},
        {abbr: 'NH', name: 'New Hampshire'},
        {abbr: 'NJ', name: 'New Jersey'},
        {abbr: 'NM', name: 'New Mexico'},
        {abbr: 'NY', name: 'New York'},
        {abbr: 'NC', name: 'North Carolina'},
        {abbr: 'ND', name: 'North Dakota'},
        {abbr: 'OH', name: 'Ohio'},
        {abbr: 'OK', name: 'Oklahoma'},
        {abbr: 'OR', name: 'Oregon'},
        {abbr: 'PA', name: 'Pennsylvania'},
        {abbr: 'RI', name: 'Rhode Island'},
        {abbr: 'SC', name: 'South Carolina'},
        {abbr: 'SD', name: 'South Dakota'},
        {abbr: 'TN', name: 'Tennessee'},
        {abbr: 'TX', name: 'Texas'},
        {abbr: 'UT', name: 'Utah'},
        {abbr: 'VT', name: 'Vermont'},
        {abbr: 'VA', name: 'Virginia'},
        {abbr: 'WA', name: 'Washington'},
        {abbr: 'WV', name: 'West Virginia'},
        {abbr: 'WI', name: 'Wisconsin'},
        {abbr: 'WY', name: 'Wyoming'},
        {abbr: 'AS', name: 'American Samoa'},
        {abbr: 'DC', name: 'District of Columbia'},
        {abbr: 'GU', name: 'Guam'},
        {abbr: 'PR', name: 'Puerto Rico'},
        {abbr: 'VI', name: 'US Virgin Islands'},
    ];
    constructor(props){
        super(props)
        // this.props = injectStripe(this.props);
        this.state = this.props.state;
        this.state.shippingBilling = true;
        this.state.cart = JSON.parse(sessionStorage.getItem('cart'));
        this.state.processingPayment = false;
        this.state.stateList = this.states.map( (state, key) => <option value={state.abbr} key={key}>{state.name}</option> );
        this.toggleShippingBilling = this.toggleShippingBilling.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state.cardError = false;
        // console.log('Checkout Props',this.props)
        this.submitForm = this.submitForm.bind(this)
    }
    componentDidMount(){
        // var elements = this.props.stripe.elements();
        // let cardNum = elements.create('cardNumber');
        // let cardExp = elements.create('cardExpiry');
        // let cardCVC = elements.create('cardCvc');
        // cardNum.mount('#cardNumberElement')
        // cardExp.mount('#cardExpiryElement')
        // cardCVC.mount('#cardCvcElement')
    }
    
    handleSubmit(ev){
        ev.preventDefault();
        
        console.log('Form Submitted!')
        // let formData = new FormData(ev.target)
        
        this.setState({processingPayment: true}, this.submitForm);

        // var stripe = Stripe('pk_test_iS14vDu3AhdzHGCxnwapoW9L');

        // var stripeHandler = StripeCheckout.configure({
        //     key: 'pk_test_iS14vDu3AhdzHGCxnwapoW9L',
        //     locale: auto
        // });

        // stripeHandler.open({})
    }
    submitForm(){
        this.setState({cardError: false})
        let formData = new FormData(document.getElementById('mainForm'));
        // return console.log(formData.get('email'));
        // let formData;
        this.props.stripe.createToken().then((result) => {
            console.log('Stripe Token: ', result)
            if(result.error) throw result.error
            else return result.token;
        })
        .then( (token) => {
            // console.log( 'Checkout success', paymentSource)
            // console.log('cart', this.state.cart)
            let shippingAddress = {}
            let billingAddress = {
                street: formData.get('billingStreet'),
                line2: formData.get('billingLine2'),
                city: formData.get('billingCity'),
                state: formData.get('billingState'),
                zip: formData.get('billingZIP'),
                country: 'us'
            }
            if(this.state.shippingBilling){
                shippingAddress = billingAddress
            } else {
                shippingAddress = {
                    street: formData.get('shippingStreet'),
                    line2: formData.get('shippingLine2'),
                    city: formData.get('shippingCity'),
                    state: formData.get('shippingState'),
                    zip: formData.get('shippingZIP'),
                    country: 'us'
                }
            }
            let request = {
                cart: this.state.cart,
                user: {
                    shippingName: formData.get('shippingFirstName') + ' ' + formData.get('shippingLastName'),
                    addresses: {
                        shipping: shippingAddress,
                        billing: billingAddress,
                    },
                    email: formData.get('email'),
                    phone: formData.get('phone')
                    
                },
                paymentSource: {
                    id: token.id,
                    last4: token.card.last4,
                    brand: token.card.brand
                }
            }
            fetch('/api/store/checkout', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                },
                method: 'POST',
                body: JSON.stringify(request)
            })
            .then( response => {
                if(response.ok) return response.json()
                else return response.statusText
            })
            .then( response => {
                // console.log(response)
                if(response.status === 'ok'){
                    console.log(response)
                    toast('Success! Order was placed!');
                    let cart = {
                        items: [],
                        total: 0
                    }
                    sessionStorage.setItem('cart', JSON.stringify(cart));
                    return response.data.orderID;
                }
            })
            .then( orderID => {
                window.location = 'http://localhost:3000/success/' + orderID;
            } )
            
            // console.log(request)
        })
        .catch( (result) => {
            this.setState({cardError: true, processingPayment: false})
            document.getElementById('cardError').innerHTML = `<p className="error text-danger">${result.message}</p>`;
        })
        
    }
    toggleShippingBilling(){
        this.setState({shippingBilling: !this.state.shippingBilling});
    }
    
    //function to display cart from saved key.
    //handle form submit
    //display form
    render(){

        return(
            <Grid>
            <Form onSubmit={this.handleSubmit} id="mainForm">
                <Row>
                    {/* Form */}
                    
                    <Col xs={12} md={8}>
                    
                        <Row>
                            {/* User Details */}
                            <Col xs={12}>
                                <Card className="shippingBilling">
                                    <CardBody>
                                        <CardTitle>Customer Information <hr/></CardTitle>
                                        <CardSubtitle onClick={this.toggleShippingBilling}>Billing</CardSubtitle>
                                        
                                        
                                            <FormGroup row>
                                                <Label xs={4} for="firstNameBilling">First Name</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="firstNameBilling"
                                                        name="firstNameBilling"
                                                        defaultValue={this.state.user.firstName}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="lastNameBilling">Last Name</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="lastNameBilling"
                                                        name="lastNameBilling"
                                                        defaultValue={this.state.user.lastName}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="email">Email</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        defaultValue={this.state.user.email}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="phone">Phone</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="phone"
                                                        name="phone"
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <br/>
                                            <FormGroup row>
                                                <Label xs={4} for="streetBilling">Street</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="streetBilling"
                                                        name="billingStreet"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.street : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="line2Billing">Line 2 (Optional)</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="line2Billing"
                                                        name="billingLine2"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.line2 : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="cityBilling">City</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="cityBilling"
                                                        name="billingCity"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.city : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="stateBilling">State</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="select"
                                                        id="stateBilling"
                                                        name="billingState"
                                                        placeholder="Select"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.state : '' )}
                                                    >
                                                        <option value="">Select</option>
                                                        {this.state.stateList}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="zipBilling">ZIP Code</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="zipBilling"
                                                        name="billingZIP"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.zip : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={{size: 7, offset: 5}} for="shippingBilling">
                                                <Input
                                                        type="checkbox"
                                                        id="shippingBilling"
                                                        name="shippingBilling"
                                                        defaultChecked={this.state.shippingBilling}
                                                        onChange={this.toggleShippingBilling}
                                                    />
                                                Shipping Address same as Billing Address?
                                                </Label>
                                                
                                                    
                                                
                                            </FormGroup>
                                        
                                        <CardSubtitle>Shipping</CardSubtitle>
                                        <Fade in={!this.state.shippingBilling}>
                                            <FormGroup row>
                                                <Label xs={4} for="firstNameShipping">First Name</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="firstNameShipping"
                                                        name="shippingFirstName"
                                                        defaultValue={this.state.user.firstName}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="lastNameShipping">Last Name</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="lastNameShipping"
                                                        name="shippingLastName"
                                                        defaultValue={this.state.user.lastName}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="streetShipping">Street</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="streetShipping"
                                                        name="shippingStreet"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.street : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="line2Shipping">Line 2 (Optional)</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="line2Shipping"
                                                        name="shippingLine2"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.line2 : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="cityShipping">City</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="cityShipping"
                                                        name="shippingCity"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.city : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="stateShipping">State</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="select"
                                                        id="stateShipping"
                                                        name="shippingState"
                                                        placeholder="Select"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.state : '' )}
                                                    >
                                                        <option value="">Select</option>
                                                        {this.state.stateList}
                                                    </Input>
                                                </Col>
                                            </FormGroup>
                                            <FormGroup row>
                                                <Label xs={4} for="zipShipping">ZIP Code</Label>
                                                <Col xs={8}>
                                                    <Input
                                                        type="text"
                                                        id="zipShipping"
                                                        name="shippingZIP"
                                                        defaultValue={(this.state.addresses ? this.state.addresses.billing.zip : '' )}
                                                    />
                                                </Col>
                                            </FormGroup>
                                        </Fade>
                                        
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                        <Row>
                            {/* Payment */}
                            <Col xs={12}>
                                <Card>
                                    <CardBody>
                                        <CardTitle>Payment Information</CardTitle>
                                        <hr/>
                                        <FormGroup row>
                                            <Label xs={4} for="cardNum">Card Number</Label>
                                            <Col xs={8} id="cardNumberElement">
                                                <CardNumberElement className="form-control"/>
                                                {/* <Input
                                                    type="number"
                                                    data-stripe='number'
                                                    id="cardNum"
                                                    name="cardNum"

                                                /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label xs={4} for="cardCVV">CVV</Label>
                                            <Col xs={{size: 4}} id="cardCvcElement">
                                                <CardCVCElement className="form-control"/>
                                                {/* <Input
                                                    type="number"
                                                    data-stripe='cvc'
                                                    id="cardCVV"
                                                    name="cardCVV"

                                                /> */}
                                            </Col>
                                        </FormGroup>
                                        <FormGroup row>
                                            <Label xs={4} for="cardExpMo">Expiration</Label>
                                            <Col xs={4} id="cardExpiryElement" >
                                                <CardExpiryElement className="form-control"/>
                                                {/* <Input
                                                    type="number"
                                                    data-stripe="exp-month"
                                                    id="cardExpMo"
                                                    name="cardExpMo"

                                                />
                                            </Col>
                                            <Col xs={4}> */}
                                                {/* <Input
                                                    type="select"
                                                    data-stripe="exp-year"
                                                    id="cardExpYr"
                                                    name="cardExpYr"

                                                >
                                                    <option value="2018">2018</option>
                                                    <option value="2019">2019</option>
                                                    <option value="2020">2020</option>
                                                    <option value="2021">2021</option>
                                                    <option value="2022">2022</option>
                                                    <option value="2023">2023</option>
                                                    <option value="2024">2024</option>
                                                </Input> */}
                                            </Col>
                                        </FormGroup>
                                        {this.state.cardError ? (
                                            <div className="errorBox bgRed">
                                                <h4 className="error"><i className="fal fa-lg fa-exclamation-circle"></i> Error</h4>
                                                <div id="cardError"></div>
                                            </div>
                                        ):(
                                            ''
                                        )}
                                        
                                        {/* 4242424242424242 */}
                                        {/* <CardElement /> */}
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>
                    
                    </Col>
                    
                    {/* Order Details */}
                    <Col xs={12} md={4}>
                        <Card>
                            <CardBody>
                                
                            {this.state.processingPayment === true ? (
                                <Button disabled block>
                                    <i className="fal fa-fw fa-spinner-third fa-spin"></i>
                                    Processing...
                                </Button>
                            ):(
                                <Button type="submit" color="success" block>
                                    <i className="fal fa-fw fa-shopping-cart"></i>&nbsp;
                                    Place Order
                                </Button>
                            )}
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                </Form>
            </Grid>
        )
    }
}

export default injectStripe(Checkout);