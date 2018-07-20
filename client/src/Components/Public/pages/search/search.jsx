import React from 'react';
import {
    Container as Grid,
    Col,
    Row
} from  'reactstrap';

export default class SearchResults extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            query: this.props.match.params.query,
            done: false,
            products: []
        }
        this.getSearchResults = this.getSearchResults.bind(this);
    }

    componentDidMount(){
        this.getSearchResults();
    }

    getSearchResults(){
        this.setState({done: false});
        console.log('SEARCHING')
        fetch(`http://localhost:5000/api/search/${this.state.query}`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then( response => {
            if(response.ok) return response.json()
            else return response.statusText
        })
        .then( response => {
            console.log('RESULTS', response)
            let {products} = this.state;
            products = response.data.results;
            this.setState({products})
        })
        .then( () => (this.setState({done: true})))
    }
    render(){
        if(this.state.done){
            // let {products} = this.state;
            let products = this.state.products.map( (product, key) => (
                <Col xs={12} md={4} key={key}>
                    <div className="product">
                        <h4 className="productName">{product.name}</h4>
                        <img src={`/images/products/${product._id}/${product.primaryImage}`} alt={product.name} className="img-responsive"/>
                    </div>
                </Col>
            ));
            return(
                <Grid>
                    <h1>Showing Results for: "{this.state.query}"</h1>
                    <hr/>
                    <Row>
                        {products.length !== 0 ? products : (
                            <Col xs={12} md={{size: 4, offset: 4}}>
                                <h2 className="text-muted">No Results</h2>
                            </Col>
                        )}
                    </Row>
                </Grid>
            )
        } else {
            return(
                <Grid>
                    <h1>Showing Results for: "{this.state.query}"</h1>
                    <hr/>
                    <Row>
                        {/* {products} */}
                    </Row>
                </Grid>
            )
            
        }
    }
}