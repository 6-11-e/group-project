import React, { Component } from "react";
import { Button } from 'react-bootstrap';
import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Grid, Row, Col } from 'react-bootstrap';

//Not yet linked
const alignButton = {
    display: 'inline-block',
    float: 'none',
    borderRadius: '0%',
    width: '10%',
  }
  

const jumboStyle = {
    backgroundColor: "#4273c1",
    // backgroundImage: "url()",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    height: '50vh',
    marginTop: '0px',
    marginBottom: '10px'
}

const jumboStyle2 = {
    backgroundColor: "#4273c1",
    // backgroundImage: "url()",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    marginTop: '10px',
    marginBottom: '10px',
    height: '25vh'
}

const whiteText = {
    color: 'white'
}

// const flexer = {
//     display: 'flex'
// }

const noContain = {
    width: '100%'
}

const divOne = {
    backgroundColor: 'red',
    height: '30vh',
    width: '100%'
}

const divTwo = {
    backgroundColor: 'green',
    height: '30vh',
    width: '100%'
}

const divThree = {
    backgroundColor: 'yellow',
    height: '30vh',
    width: '100%'
}

const catDiv = {
    border: 'solid black 1px',
    height: '20vh',
    // width: '100%',
    margin: '5px 10px 15px 10px'
}



const displayBlocks = {
    padding: '0px',
    marginTop: '0px',
    paddingRight: '5px',
    paddingLeft: '5px'
}

class MyJumbotron extends Component {
    render(){
        return (
    <div>
        <Jumbotron style={jumboStyle}>
            <div>
            <h1 style={whiteText}>This is the header</h1>
            <p style={whiteText}>
                This will be text describing what the user might experience by exploring the site.
            </p>
            <p>
            <Link to="/gallery"><Button bsStyle="default" bsSize="large" style={alignButton}>Gallery</Button></Link>   
            </p>
            </div>
        </Jumbotron>
        <Grid style={noContain}>
        <div>
        <Row >
        <Col xs={12} md={4} style={displayBlocks}>
            <div style={divOne}>
            </div>
        </Col>
        <Col xs={12} md={4} style={displayBlocks}>
            <div style={divTwo}>
            </div>
        </Col>
        <Col xs={12} md={4} style={displayBlocks}>
            <div style={divThree}>
            </div>
        </Col>
        </Row>
        </div>
        </Grid>
        <Jumbotron style={jumboStyle2}>
            <div>
            <h2 style={whiteText}>This might advertise a special deal happening on the site</h2>
            </div>
        </Jumbotron>
        <Grid style={noContain}>
        <div>
        <Row >
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
                Category
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Another
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Additional
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Even More
            </div>
        </Col>
        </Row>
        <Row>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Eventually
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Almost
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            And
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks}>
            <div style={catDiv}>
            Done
            </div>
        </Col>
        </Row>
        </div>
        </Grid>


        {/* <Dummy /> */}
    </div>
);
    }
}

export default MyJumbotron;