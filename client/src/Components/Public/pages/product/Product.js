import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import { POINT_CONVERSION_COMPRESSED } from 'constants';
import Products from '../components/Products';

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
    padding: '50px'
}

// const noContain = {
//     width: '100%'
// }

const productFeature = {
    height: '60vh',
    backgroundColor: 'black',
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
        this.state = {
            data: {

            },
            done: false
        }
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

    render() {
        if(this.state.done){
            return(

                            <div style={mainDiv}>
                            <Grid>
                                <Row>
                                <Col md={6}>
                                <div style={productFeature}>
                                </div>
                                </Col>
                                <Col md={6}>
                                    <div style={primaryProduct}>
                                        <h2>{this.state.data.product.name}</h2>
                                        <h4>{this.state.data.product.price}</h4>
                                        <p>{this.state.data.product.description}</p>
                                        <label>Qty</label>
                                        <input type="number" name="quantity" /><br />
                                        <Button>Add to cart</Button>
                                    </div>
                                 </Col>
                                 </Row>
                                 <Row>
                                 <h3>Related Products</h3>
                                 <Col md={4}>
                                     <div style={relatedProducts}>
            
                                     </div>
                                 </Col>
                                 <Col md={4}>
                                     <div style={relatedProducts}>
                                        
                                     </div>
                                 </Col>
                                 <Col md={4}>
                                     <div style={relatedProducts}>
                                        
                                     </div>
                                 </Col>
                                 </Row>
                             </Grid>
                         </div>
            
            )
        } else {
            return(
                <div>
                    No data yet! Style this however you want!
                </div>
            )
        }
    }

}
export default MyProduct;