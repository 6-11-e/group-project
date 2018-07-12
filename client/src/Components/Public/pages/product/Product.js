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

// const relatedProductsBg = {
//     backgroundColor: 'whitesmoke',
//     width: '100%'
// }


// function getQueryVariable(variable)
// {
//        var query = window.location.search.substring(1);
//        var vars = query.split("&");
//        for (var i=0;i<vars.length;i++) {
//                var pair = vars[i].split("=");
//                if(pair[0] == variable){return pair[1];}
//        }
//        return(false);
// }

// getQueryVariable("id");

// console.log(vars);

class MyProduct extends React.Component {
    constructor(props){
        super(props);
        console.log(this.props)
        this.state = {
            data: {

            }
        }
    }

    componentDidMount() {
        fetch('/api/store/product/name=' + this.props.match.params.id)
        .then(response => response.json())
        .then(response => {
            console.log(response)
            let data = this.state.data;
            data.product = response.data.product;
            let product = () => {
                return (
                    <h2>{data.products.name}</h2>
                )
            }
            this.setState({product})
            console.log(product)
            console.log(data.product.name)
        })
    }

    render() {
        return (
            <div style={mainDiv}>
                <Grid>
                    <Row>
                    <Col md={6}>
                    <div style={productFeature}>
                    </div>
                    </Col>
                    <Col md={6}>
                        <div style={primaryProduct}>
                            {this.state.product}
                            {/* <h2></h2>
                            <label>Qty</label>
                            <input type="number" name="quantity" /><br />
                            <Button>Add to cart</Button> */}
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
    }
}

export default MyProduct;