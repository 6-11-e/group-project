import React, { Component } from "react";

const footerStyle = {
    position: 'absolute',
    width: '100%',
    height: '70px', /* Set the fixed height of the footer here */
    lineHeight: '60px', /* Vertically center the text there */
    backgroundColor: '#3a3a3a',
    marginTop: '0px',
    color: 'white'
}

class Footer extends Component {
    render() {
        return (
            <footer style={footerStyle}>
                <div className="container">
                    <p>We Made This © 2018</p>
                </div>
            </footer>
        )
    }
}

export default Footer;