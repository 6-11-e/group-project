import React, { Component } from "react";
// import { Button } from 'react-bootstrap';
// import { Jumbotron } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { Grid, Row, Col } from 'react-bootstrap';
import { Container, Row, Col, Button, Jumbotron } from 'reactstrap';
import './style.css';
//Not yet linked
const alignButton = {
    display: 'inline-block',
    float: 'none',
    borderRadius: '0%',
  }
  

const jumboStyle = {
    backgroundColor: "#4273c1",
    backgroundImage: "url(https://cdn.flexshopper.xyz/marketing-images/category/slc_hero-videoGames.png)",
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    height: '50vh',
    marginTop: '0px',
    marginBottom: '10px',
    borderRadius: '0%'

}

const jumboStyle2 = {
    backgroundColor: "#4273c1",
    // backgroundImage: "url()",
    backgroundSize: 'cover',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    marginTop: '10px',
    marginBottom: '10px',
    height: '25vh',
    borderRadius: '0%'
}

const whiteText = {
    color: 'white'
}

// const flexer = {
//     display: 'flex'
// }

// const noContain = {
//     width: '100%'
// }

// const divOne = {
//     backgroundColor: 'rgb(34,34,34)',
//     backgroundImage: 'url(http://www.geekfactormedia.com/wp-content/uploads/2017/08/pf2.png)',
//     backgroundSize: '60%',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     height: '30vh',
//     width: '100%'
// }

// const divTwo = {
//     backgroundColor: 'rgb(34,34,34)',
//     backgroundImage: 'url(http://www.pngmart.com/files/3/Nintendo-Characters-Transparent-PNG.png)',
//     backgroundSize: '80%',
//     backgroundPosition: 'center',
//     backgroundRepeat: 'no-repeat',
//     height: '30vh',
//     width: '100%',
// }

// const divThree = {
//     backgroundColor: 'rgb(34,34,34)',
//     height: '30vh',
//     width: '100%'
// }

const catDiv = {
    // border: 'solid black 1px',
    height: '20vh',
    // width: '100%',
    margin: '5px 10px 15px 10px',
    backgroundImage: 'url(https://vignette.wikia.nocookie.net/megamitensei/images/7/74/PlayStation_4.png/revision/latest/scale-to-width-down/511?cb=20170331210204)',
    backgroundSize: '60%',
    backgroundRepeat: 'no-repeat',
}

// const divText = {
//     color: 'white',
//     marginTop: '0px'
// }


const displayBlocks = {
    padding: '0px',
    marginTop: '0px',
    paddingRight: '5px',
    paddingLeft: '5px'
}

class MyJumbotron extends Component {
    constructor(props){
        super(props)
        this.state = (this.props.state ? this.props.state : {} );
        this.getFPData = this.getFPData.bind(this)
        this.state.productsDone = false;
        this.state.data = {
            primaryJumbo: {
                title: '',
                tagline: '',
                image: ''
            },
            secondaryJumbo: {
                title: '',
                tagline: '',
                image: ''
            },
            categories: [
                {name: '', _id: ''}
            ],
            featuredProducts: [
                {
                    _id: '',
                    name: '',
                    images: [
                        {name: '', primary: false}
                    ]
                },
                {
                    _id: '',
                    name: '',
                    images: [
                        {name: '', primary: false}
                    ]
                },
                {
                    _id: '',
                    name: '',
                    images: [
                        {name: '', primary: false}
                    ]
                }
            ]
        }
    }
    getFPData(){
        //Main announcement
        //featuredProducts*3
        //featuredAnnounce
        //categories
        
        /*
        { featuredAnnounce
            name:
            shortDesc
        }
        {
            featuredProducts 
            product.name
            product.image
        }
        { mainAnnouncement
            title:
            tagline:
            backgroundImage
        }
        */
       fetch(`/api/store/getFeaturedProducts`, {
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then( response => {
           if (response.ok) return response.json()
           else return response.statusText
       })
       .then( response => {
           if (response.status === 'ok'){
               let {data} = this.state;
               data.featuredProducts = response.data.featuredProducts;
            
            //    console.log(response.data)
               this.setState({data})
           }
       })
       .then( () => this.setState({productsDone: true}))

       fetch('/api/store/categories/public', {
           headers: {
               'Content-Type': 'application/json'
           }
       })
       .then( response => {
           if(response.ok) return response.json()
           else return response.statusText
       })
       .then( response => {
           if(response.status === 'ok'){
               let {data} = this.state;
               data.categories = response.data.categories;
               this.setState({data})
           }
       })

    }
    componentDidMount(){
        this.getFPData();
    }
    render(){
        let featProds = this.state.data.featuredProducts;
        for(let prod of featProds){
            for(let img of prod.images){
                if(img.primary === true) prod.primaryImage = img.name;
            }
        }
        let categories = this.state.data.categories.map( (category, key) => (
            <Col key={key} xs={6} md={3} className="divImageButton" >
                <div style={catDiv}>
                    {category.name}
                </div>
            </Col>
        ))
        let products = featProds.map( (product, key) => (
            <Col xs={12} md={4} style={displayBlocks} key={key} className="fpProduct">
            {this.state.productsDone ? (
                
                    <Link to={'/store/product/' + encodeURIComponent(product.name)}>
                        <div className="divImageButton">
                            <h2>{product.name}</h2>
                            {product.primaryImage && product.primaryImage !== ''? (
                                <img className="img-responsive" alt={product.name} src={`/images/products/${product._id}/${product.primaryImage}`}/>
                            ):(
                                // <img className="img-responsive" alt={product.name} src={`https://placehold.it/400&text=${encodeURIComponent(product.name)}%20Image`}/>
                            ''
                            )}
                        </div>
                    </Link>
                
            ):''}
            </Col>
        ))
        return (
    <div style={{width: '100%'}}>
        <Jumbotron style={jumboStyle}>
            <div>
            <h1 style={whiteText}>Welcome to E-Commerce!</h1>
            <p style={whiteText}>
                Take a few moments to explore our product selection!
            </p>
            <p>
            <Link to="/gallery"><Button color="default" size="lg" style={alignButton} className='divImageButton'>Gallery</Button></Link>   
            </p>
            </div>
        </Jumbotron>
        <Container fluid>
        <div>
        <Row >
            {products}
        {/* <Col xs={12} md={4} style={displayBlocks}>
            <a>
            <div style={divOne} className='divImageButton'>
            <h2 style={divText}>Shop Pathfinder</h2>
            </div>
            </a>
        </Col>
        <Col xs={12} md={4} style={displayBlocks}>
            <div style={divTwo} className='divImageButton'>
            <h2 style={divText}>Shop Nintendo</h2>
            </div>
        </Col>
        <Col xs={12} md={4} style={displayBlocks}>
            <div style={divThree} className='divImageButton'>
            </div>
        </Col> */}
        </Row>
        </div>
        </Container>
        <Jumbotron style={jumboStyle2}>
            <div>
            <h2 style={whiteText}>Enjoy the wonderful products!</h2>
            </div>
        </Jumbotron>
        <h3>Categories</h3>
        <Container>
        <div>
        <Row >
            {categories}
        {/* <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
                Category
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Another
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Additional
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Even More
            </div>
        </Col>
        </Row>
        <Row>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Eventually
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Almost
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            And
            </div>
        </Col>
        <Col xs={6} md={3} style={displayBlocks} className='divImageButton'>
            <div style={catDiv}>
            Done
            </div>
        </Col> */}
        </Row>
        </div>
        </Container>


        {/* <Dummy /> */}
    </div>
);
    }
}

export default MyJumbotron;