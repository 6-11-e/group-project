import React, { Component } from 'react';
// import { Pager } from 'react-bootstrap'
import Products from '../components/Products'
import Categories from '../components/Categories'
import { Container, Pagination, PaginationItem, PaginationLink } from 'reactstrap';
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
        <div>
                <Container fluid>
                {/* <Row>
                <Col sm="2"> */}
                <div style={navContainer} className="hideMobile">
                    <Categories />
                </div>
                {/* </Col>
                <Col sm="10" xs="12"> */}
                    <Products page={this.state.page}/>
                {/* </Col>
                </Row> */}
                </Container>

                {/* <div>
                        <Pagination aria-label="Page navigation example">
                    <PaginationItem>
                        <PaginationLink previous href="#" />
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">
                        1
                    </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                    <PaginationLink href="#">
                        2
                    </PaginationLink>
                    </PaginationItem>
                </Pagination>
                </div> */}
        </div>
        )
    }
}

export default Gallery;