import React from 'react';

const displayFlex = {
    display: 'flex',
    margin: '50px',
    lineHeight: '3',
}

const listStyle = {
    listStyleType: 'none'
}

const mainInfo = {
    width: '85%',
    height: '100vh',
    border: '1px solid gray',
    marginLeft: '70px',
    borderRadius: '1%'
}

class Dashboard extends React.Component {
    render(){
        return(
        <div style={displayFlex}>
            <div>
                <ul style={listStyle}>
                    <li><a>Pending Orders</a></li>
                    <li><a>Product Info</a></li>
                    <li><a>Add/Edit Products</a></li>
                    <li><a>User Info</a></li>
                </ul>
            </div>
            <div style={mainInfo}>
                <h1>Info</h1>
            </div>
        </div>
        )
    }
}

export default Dashboard;