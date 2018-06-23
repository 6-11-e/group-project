import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';

//Not yet linked

const jumboStyle = {
    backgroundColor: "#4273c1",
    // backgroundImage: "url()",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    height: '50vh'
}

const whiteText = {
    color: 'white'
}


class MyJumbotron extends Component {
    render(){
        return (
    <div>
    <Jumbotron style={jumboStyle}>
        <div className="container">
        <h1 style={whiteText}>This is the header</h1>
        <p style={whiteText}>
            This will be text describing what the user might experience by exploring the site.
        </p>
        <p>
        See Product
        {/* <Link to="/calculator"><Button bsStyle="primary">Handicap Calculator</Button></Link> */}
        </p>
        </div>
    </Jumbotron>
    {/* <Dummy /> */}
    </div>
);
    }
}

export default MyJumbotron;