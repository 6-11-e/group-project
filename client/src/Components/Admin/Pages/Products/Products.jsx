import React from 'react';
import{
	Container as Grid,
	Row,
	Col,
	Card,
	CardHeader,
	CardFooter,
	CardBody,
	Form,
	Input,
	Label,
	ListGroup,
	ListGroupItem,
	Button
} from 'reactstrap';
import Loader from '../../Loader/Loader';

export default class Products extends React.Component {
	constructor(props){
		super(props)
		this.state = this.props.state;
		this.state.data = {};
		this.state.loading = false;
		this.state.done = false;
		this.state.perPage = 10;
		this.state.page = 1;
		this.handleChangePerPage = this.handleChangePerPage.bind(this)
	}

	getProducts() {
		this.setState({done: false});
		
			console.log('Fetching Products')
			fetch(`/api/store/products/${this.state.perPage}/${this.state.page}`, {
				headers: {
					'Content-Type': 'application/json',
					'Authorization': this.state.token
				}
			})
			.then( response => {
				if(response.ok === true){
					return response.json();
				}
				return response.statusText;
			})
			.then( response => {
				var data = this.state.data;
				data.products = response.data;
				this.setState({data})
				console.log(data)
			})
			.then( () => {
				this.setState({done: true})
			})
		
	}
	componentWillMount() {
		this.getProducts();
	}
	handleChangePerPage(event) {
		this.setState({perPage: event.target.value}, this.getProducts)
		// this.getProducts();

		//make sure when adding pager, add totalCount to returned products. if totalcount<this.state.perPage, dont show pager
	}
	render(){
		return(
			<Grid>
				{this.state.done !== true ? (<Loader/>) : (
					<div>
						<div className="pageHeader">
							<h1>Products</h1>
							<span className="pullRight">
								<Button href="/admin/store/product/new">New Product</Button>
							</span>
						</div>
						{console.log(this.state.data.products)}
						<Row>
							<Col xs="12">
								<Card>
									<CardHeader>
										<div className="cardTools">
											<Form inline className="cardToolsForm">
												<Input type="text" placeholder="Search Products..." className="form-control" bsSize="sm"/>&nbsp;
												<Label for="perPageSelect">Per Page&nbsp;</Label>
												<Input type="select" defaultValue={this.state.perPage} onChange={this.handleChangePerPage} className="form-control" bsSize="sm" id="perPageSelect">
													<option value="10">10</option>
													<option value="25">25</option>
													<option value="50">50</option>
												</Input>
											</Form>
										</div>
									</CardHeader>
									<CardBody>
										<ListGroup>
											{this.state.data.products.map( (product, key) => (
												<ListGroupItem tag="a" key={key} href={"/admin/store/product/edit/" + product._id}>
													{product.name}
												</ListGroupItem>
											))}
										</ListGroup>
									</CardBody>
								</Card>
							</Col>
						</Row>
					</div>
				)}
			</Grid>
			
		)
	}
}