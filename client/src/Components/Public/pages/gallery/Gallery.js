import React, { Component } from 'react';
import { Pager } from 'react-bootstrap'
import Products from '../components/Products'
import Categories from '../components/Categories'
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { Container, Row, Col, Button } from 'reactstrap';


const navContainer = {
    width: '25%',
    marginTop: '40px',
    listStyleType: 'none',
    lineHeight: '60px',
    height: '100vh',
    float: 'left',
    borderRight: 'solid gray 1px'
}

const ulContainer = {
    listStyleType: 'none',
    paddingRight: '30px'
}



class Gallery extends Component {

    render() {
        return (
        <div style={{width: '100%'}}>
                <div>
                </div>
                <div style={navContainer} className="hideMobile">
                    <Categories />
                </div>
                <Container fluid>
                    <Products />
                </Container>
                <div>
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
                </div>
        </div>
        )
    }
}

export default Gallery;