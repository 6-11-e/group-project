import React, { Component } from 'react';

class ViewProducts extends React.Component {

constructor() {
    super();
    this.state = {
        data: [],
    }
}
componentDidMount() {
    fetch('/api/store/products')
    .then(response => {
        return response.json();
    }).then(data => {
        let products = data.map((products) => {
            console.log(data)
            return(
                <table> 
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                    </tr>
                    <tr>
                        <td>{products.title}</td>
                        <td>{products.price}</td>
                    </tr>
                </table>
            )
        })
        this.setState([{data}]);
    })
}

render() {
    return(
        <div>
            {this.state.data}
        </div>
    )
}
}

export default ViewProducts