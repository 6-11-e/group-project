import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';

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

const noContain = {
    width: '100%'
}

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

const relatedProductsBg = {
    backgroundColor: 'whitesmoke',
    width: '100%'
}

class MyProduct extends Component {
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
                        <h2>Product Name</h2>
                        <p>This is a description of the product</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin vestibulum arcu quis consectetur placerat. Pellentesque interdum massa ut neque consectetur, ut tempus enim condimentum. Curabitur a congue erat, in blandit urna. Pellentesque cursus odio vitae lorem consequat, dapibus malesuada sem molestie. </p>
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
    }
}

export default MyProduct;