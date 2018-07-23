import React, { Component } from 'react';
// import { Pager } from 'react-bootstrap'
import Products from '../components/Products'
import Categories from '../components/Categories'
import { Container, Col, Row} from 'reactstrap';
// import {  Row, Col, Button } from 'reactstrap';


const navContainer = {
    width: '25%',
    marginTop: '40px',
    listStyleType: 'none',
    lineHeight: '60px',
    height: '100vh',
    float: 'left',
    borderRight: 'solid gray 1px'
}

// const ulContainer = {
//     listStyleType: 'none',
//     paddingRight: '30px'
// }

const myProducts = {
    float: 'right'
}



class Gallery extends Component {
    constructor(props){
        super(props)
        this.state = {
            page: (this.props.match.params.id? this.props.match.params.id : 1)
        }
    }
    render() {
        return (

            <Container fluid>
                <Row style={{width: '100%'}}>
                    <Col md={2} className="hideMobile mainSidebar">
                        <Categories />
                    </Col>
                    <Col xs={12} md={10}>
                        <h2 style={{marginTop: '0.9rem'}}>Gallery</h2>
                        <hr/>
                        <Products page={this.state.page}/>
                    </Col>
                </Row>
            </Container>

        )
    }
}

export default Gallery;