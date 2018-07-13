import React, { Component } from 'react';

const ulContainer = {
    listStyleType: 'none',
    // height: '100vh'
    // float: 'left',
    // marginLeft: '20px'
    paddingRight: '30px'
}

let api = '/api/store/categories/public'

class Categories extends React.Component {
    constructor() {
        super();
        this.state = {
            categories: [],
        };
    }



    componentDidMount() {
        fetch(api)
        .then(response => {
            return response.json();
        }).then(response => {
            console.log('cats', response.data)
            let categories = response.data.categories.map((category, id) => {
                return (
                    // <ul style={ulContainer}>
                        <li key={id}>{category.name}</li>
                    // </ul>
                )
            })
            this.setState({categories})
        })
    }

    render() {
        return (
            <div>
                <ul style={ulContainer}>
                    {this.state.categories}
                </ul>
            </div>
        )
    }
}

export default Categories;