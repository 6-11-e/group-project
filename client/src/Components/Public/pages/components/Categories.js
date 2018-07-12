import React, { Component } from 'react';

const ulContainer = {
    listStyleType: 'none',
    // height: '100vh'
    // float: 'left',
    // marginLeft: '20px'
    paddingRight: '30px'
}

let api = '/api/store/products/'

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            products: [],
        };
    }



    componentDidMount() {
        fetch(api)
        .then(response => {
            return response.json();
        }).then(data => {
            let products = data.map((products, id) => {
                return (
                    <ul style={ulContainer}>
                        <li>{products.categories}</li>
                    </ul>
                )
            })
            this.setState({products})
        })
    }

    render() {
        return (
            <div>
                {this.state.products}
            </div>
        )
    }
}

export default Categories;