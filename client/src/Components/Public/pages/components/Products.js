import React from 'react';
import { Link } from 'react-router-dom';
import {
    Pagination,
    PaginationItem,
    PaginationLink
} from 'reactstrap';


const productBlocks = {
    width: '200px',
    height: '250px',
    border: '1px solid gray',
    margin: '20px',
    padding: '20px',
    paddingTop: '20px',
    display: 'inline-block',
    verticalAlign: 'top'
}

const productsDiv = {
    // maxWidth: '1200px'
}

// let api = '/api/store/products/9'


class Products extends React.Component {
    constructor(props) {
        super(props);
        // console.log(this.props)
        this.state = {
            products: [],
            page: this.props.page,
            count: 0
        };
        
        this.state.perPage = 9;
        this.state.pageLinks = [];
        this.state.done = false;
        this.handleClick = this.handleClick.bind(this);
        this.getProducts = this.getProducts.bind(this);
    }
    getProducts(){
        console.log('page', this.state.page)
        fetch(`/api/store/products/${this.state.perPage}/${this.state.page}`)
        .then(response => {
            return response.json();
        }).then(response => {
            // console.log(data.data)
            let products = response.data.products.map((product, id) => {
                // console.log(products)
                return (
                    <Link to={"/store/product/" + encodeURIComponent(product.name)} key={id}>
                    <div key={product._id} style={productBlocks} className="grid-container">
                        <h6>{product.name}</h6>
                        <p>${product.price}</p>
                        <img src={`/images/products/${product._id}/${product.primaryImage}`} className="img-responsive"/>
                    </div>
                    </Link>
                )
            })
            let pageCount = Math.ceil(parseInt(response.data.count) / this.state.perPage)
            let pageLinks = []
            for(let x = 1; x < pageCount + 1; x++){
                pageLinks.push((<PaginationItem>
                    <PaginationLink href={`/gallery/${x}`}>
                        {x}
                    </PaginationLink>
                </PaginationItem>))
            }
            console.log(pageCount);
            console.log(this.state)
            this.setState({products, count: response.data.count, pageLinks, done: true});
            })
    }
    
    
    componentDidMount() {
        // console.log(this.state)
        this.getProducts();
    }

    handleClick() {
        this.setState(prevState => ({
            page: prevState.page++
        }));
    }



    render() {
        if(this.state.done){
            return(
                <div>
                <div>
                    {this.state.products}
                </div>
                <div className="paginationSet">
                    <Pagination>
                        {this.state.pageLinks}
                    </Pagination>
                </div>
                </div>
            )
        } else {
            return '';
        }
        
    }
}

export default Products;