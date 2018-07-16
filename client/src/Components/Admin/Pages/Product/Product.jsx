import React from 'react';
import {
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from 'reactstrap';
import Loader from '../../Loader/Loader';
import AutoSuggestTagsInput from '../../AutoSuggestTagsInput/AutoSuggestTagsInput';
import { toast, Slide } from 'react-toastify';

export default class Product extends React.Component {
    constructor(props) {
        super(props)
        this.state = this.props.state;
        this.state.data = {};
        this.state.productID = this.props.match.params.id;
        this.state.loading = false;
        this.state.done = false;
        this.handleGoBack = this.handleGoBack.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleCategoriesChange = this.handleCategoriesChange.bind(this)
        this.state.modalShow = false;
        this.state.uploadModal = false;
        this.toggleModal = this.toggleModal.bind(this);
        this.imageFormSubmit = this.imageFormSubmit.bind(this)
        this.showUploadModal = this.showUploadModal.bind(this)
        this.toggleUploadModal = this.toggleUploadModal.bind(this)
        this.uploadFormSubmit = this.uploadFormSubmit.bind(this)
        this.deleteFormSubmit = this.deleteFormSubmit.bind(this)
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
        this.state.deleteModal = false;
        this.showDeleteModal = this.showDeleteModal.bind(this)

    }
    
    toggleDeleteModal(){
        this.setState({modalShow: !this.state.modalShow})
        this.setState({deleteModal: !this.state.deleteModal})
    }
    toggleModal(){
        this.setState({modalShow: !this.state.modalShow});
    }
    toggleUploadModal(){
        this.setState({uploadModal: !this.state.uploadModal});
        this.setState({modalShow: !this.state.modalShow});
    }
    getProduct() {
        this.setState({done: false});
        fetch(`/api/store/product/id=${this.state.productID}/includeCats`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            }
        })
        .then( response => {
            if(response.ok === true){
                return response.json()
            }
            return response.statusText;
        })
        .then( response => {
            var data = this.state.data;
            data = response.data;
            this.setState({data})
        })
        .then( () => {
            this.setState({done: true})
        })
    }
    componentWillMount() {
        this.getProduct();
    }

    handleGoBack(){
        this.props.history.goBack();
    }

    handleSubmit(event){
        event.preventDefault();
        let formData = new FormData(event.target)
        let productData = this.validateForm(formData);
        // console.log(productData);
        // this.setState({done: false});
        fetch(`/api/store/product/edit/${this.state.productID}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.state.token
            },
            body: JSON.stringify(productData),
            method: 'POST'
        })
        .then( response => {
            if(response.ok){
                return response.json()
            }
            return response.statusText;
        })
        .then( response => {
            if(response.status === "error"){
                console.log(response)
            }
            toast('Updated Product!', {
                position: toast.POSITION.BOTTOM_RIGHT,
                autoClose: 4000,
                transition: Slide
            })
        })
        .then( () => {
            
            this.getProduct()
        })
    }
    validateForm(formData) {
        let data = formData;
        let selectedCats = this.state.selectedCats
        let product = {
            name: data.get('name'),
            deleted: (data.get('deleted') === "on" ? true : false),
            price: parseFloat(data.get('price')),
            inStock: parseInt(data.get('inStock')),
            categories: selectedCats,
            description: data.get('description'),
            images: this.state.data.product.images
            //other attr like images (array of filenames)
        }
        return product;
    }
    handleCategoriesChange(e) {
        let options = e.target.options;
        let selected = [];
        for(let option in options){
            if(options[option].selected) {
                selected.push(options[option].value)
            }
        }
        this.setState({selectedCats: selected})
    }
    showUploadModal(){
        this.setState({modalShow: !this.state.modalShow})
        this.setState({uploadModal: !this.state.uploadModal})
    }
    showDeleteModal(){
        this.setState({modalShow: !this.state.modalShow})
        this.setState({deleteModal: !this.state.deleteModal})
    }
    deleteFormSubmit(e){
        e.preventDefault();
        let selection = new FormData(e.target);
        selection = selection.getAll('deleteImage');

        let {images} = this.state.data.product;
        let delPrimary = false
        console.log('before', images)
        for(let selectedImg of selection){
            for(let image in images){
                console.log('loop image',images[image])
                if(selectedImg == images[image].name){
                    if(images[image].primary == true) delPrimary = false;
                    images.splice(image, 1)
                }
            }
        }
        console.log('after',images)
        var {data} = this.state;
        data.product.images = images;
        if(delPrimary == true) data.product.images[0].primary = true;
        this.setState({data})
        this.toggleDeleteModal();

        //NO NEED TO FETCH! JUST MODIFY STATE
        // console.log('IMG TO DEL', selection)
        // this.setState({done: false})
        // fetch(`/api/store/product/${this.state.productID}/images`, {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': this.state.token
        //     },
        //     method: 'DELETE',
        //     body: JSON.stringify({images: selection})
        // })
        // .then( response => {
        //     if(response.ok) return response.json()
        //     else return response.statusText;
        // })
        // .then( response => {
        //     console.log(response)
        //     //will want to re-fetch product
        // })
    }
    imageFormSubmit(e){
        e.preventDefault();
        let selection = new FormData(e.target);
        selection = selection.get('primaryImage')

        let prodImages = []
        let {images} = this.state.data.product
        let x = null
        for(let image in images){
            x = images[image]
            if(x.name === selection){
                x.primary = true;
                
            } else {
                x.primary = false;
            }
            prodImages.push(x)
        }
        let {data} = this.state;
        data.product.images = prodImages;
        this.setState({data})
        //After Processing, close modal
        this.toggleModal()
    }
    uploadFormSubmit(e){
        e.preventDefault();
        let newImages = new FormData(e.target);
        newImages = newImages.getAll('newImages');
        console.log(newImages);
        // this.uploadImages(newImages);
        this.setState({done: false})
        fetch(`/api/store/product/${this.state.productID}/uploadImages/`,{
            headers: {
                // 'Content-Type': undefined,
                'Authorization': this.state.token
            },
            method: 'POST',
            body: new FormData(e.target) 
        })
        .then( response => {
            if(response.ok){
                return response.json()
            }
            return response.statusText;
        })
        .then( response => {
            console.log('File Upload Response:\n', response)
        })
        .then( () => {
            this.getProduct();
        })
        .then( () => {
            this.toggleUploadModal()
        })
    }
   
    render() {
        const {product} = this.state.data;
        // console.log(product)
        if(this.state.done){
            if(product.images && product.images.length > 0){
                let primary = product.images.filter( (img) => {
                    if(img.primary){
                        return true;
                    }
                })
                if(primary && primary.length > 0){
                    product.primaryImage = primary[0].name
                }
                
            }
            
            // console.log(primary)
        }
            
      
        
        
        return(
            <Grid>
                {this.state.done !== true ? (<Loader/>) : (
                    <div>
                        <Row>
                            <div className="pageHeader">
                                <h1>Product Management</h1>
                            </div>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>Product Details</CardHeader>
                                    <CardBody>
                                        <Form onSubmit={this.handleSubmit}>
                                        <Row>
                                            {/* Product Primary Image, button for manage images */}
                                            <Col xs="12" md="3">
                                                <div className="imagePanel">
                                                    <span className="prodPrimaryImg">
                                                        {product.images && product.primaryImage ? (
                                                            <img src={`/images/products/${product._id}/${product.primaryImage}`} alt="Primary image for product" className="img-responsive"/>
                                                        ):(
                                                            <img src={`https://placehold.it/400&text=No%20Image`} alt="No imgage for product!" className="img-responsive"/>
                                                        )}
                                                        
                                                    </span>
                                                    <span className="imgsB">
                                                        <Button color="success" onClick={this.toggleModal}>Edit Images</Button>
                                                    </span>
                                                </div>
                                            </Col>
                                            {/* Primary Form */}
                                            <Col xs="12" md="9" >
                                                <FormGroup row>
                                                    <Label for="name" sm={2}>Name</Label>
                                                    <Col sm={10}>
                                                        <Input type="text" name="name" id="name" placeholder="Product Name..." className="form-control" defaultValue={product.name}/>
                                                    </Col> 
                                                </FormGroup>
                                                <Row>
                                                    <Col sm={{size: 10, offset: 2}} md={{size: 4, offset: 2}}>
                                                        <FormGroup inline check>
                                                            <Label check>
                                                                <Input type="checkbox" name="deleted" checked={product.deleted} onChange={this.handleDeletedChange} sm={6} md={4} /> Remove Product?
                                                            </Label>
                                                        </FormGroup>
                                                    </Col>
                                                    <Col sm={{size: 10, offset: 2}} md={{size: 4, offset: 2}}>
                                                        <FormGroup row>
                                                            <Label for="price">$</Label><Input type="number" name="price" id="price" className="form-control" defaultValue={product.price}/>
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={4}>
                                                        <FormGroup row>
                                                            <Label for="inStock">In Stock</Label>
                                                            <Input type="number" id="inStock" name="inStock" className="form-control" defaultValue={product.inStock} />
                                                        </FormGroup>
                                                    </Col>
                                                    <Col xs={8}>
                                                        <FormGroup row>
                                                            <Label for="categories">Categories</Label>
                                                            {/* <AutoSuggestTagsInput suggestions={this.state.data.categories} inputProps={{className: "form-control", placeholder: "Add Categories"}} /> */}
                                                            <Input type="select" name="categories[]" id="categories" multiple defaultValue={product.categories} onChange={this.handleCategoriesChange}>
                                                            {this.state.data.categories.map( (category, key) => {
                                                                return <option value={category._id} key={key}>{category.name}</option>
                                                            })}

                                                            </Input> 
                                                        </FormGroup>
                                                    </Col>
                                                </Row>
                                                <Row>
                                                    <Col xs={12}>
                                                        <Input type="textarea" name="description" id="description" defaultValue={product.description} /> 
                                                    </Col>
                                                </Row>

                                                <Row>
                                                    <Col xs={{size: 12}} md={{size: 4, offset: 8}}>
                                                        <Button color="secondary" onClick={this.handleGoBack}>Cancel</Button>
                                                        <Button color="primary" type="submit">Submit</Button>
                                                    </Col>
                                                </Row>
                                                {/* use a special onChange function(event) to listen for event.name as product field in state */}
                                                {/* Use grid with form, set formGroup.pull-right#positioning for save/cancel */}
                                            </Col>
                                        </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                {/* Cool to have performance details here in another card */}
                            </Col>
                        </Row>
                        <Modal isOpen={this.state.modalShow} toggle={this.toggleModal} className="prodImgModal" >
                            <ModalHeader toggle={this.toggleModal}>
                                Image Editor
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.imageFormSubmit}>
                                {product.images.map( (image, key) => (
                                    <FormGroup key={key}>
                                        <Label for={`prodImages_${key}`} check>
                                            <img src={`/images/products/${product._id}/${image.name}`} className="img-responsive"/>
                                        </Label>
                                        <Input id={`prodImages_${key}`} name="primaryImage" type="radio" value={image.name}/>
                                    </FormGroup>
                                    
                                ))}
                                <div className="form-controls-left">
                                    <Button onClick={this.showDeleteModal}>Delete</Button>
                                </div>
                                <div className="form-controls">
                                    <Button onClick={this.showUploadModal}>Upload</Button>
                                    <Button type="submit">Select</Button>
                                </div>
                                </Form>
                                {/* <Form onSubmit={this.handleImageSelectForm}>
                                    {this.state.productImages.map( image => {

                                    })}
                                </Form> */}
                            </ModalBody>
                            <ModalFooter>
                                {/* Button onClick=this.imageSelectChange - takes all images selected setstate prodImages. fetchpost should take that. */}
                            </ModalFooter>
                        </Modal>
                        <Modal isOpen={this.state.uploadModal} toggle={this.toggleUploadModal} className='imageUploadModal'>
                            <ModalHeader toggle={this.toggleUploadModal}>Upload Image</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.uploadFormSubmit} encType="multipart/form-data">
                                    <Input type="file" name="newImages" id="newImages" accept='image/*' multiple/>
                                    <Button type="submit">Upload</Button>
                                </Form>
                            </ModalBody>
                        </Modal>
                        <Modal isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal} className="deleteModal">
                            <ModalHeader toggle={this.toggleDeleteModal}>Delete Images</ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.deleteFormSubmit}>
                                    {console.log('del IMG', product.images)}
                                    {product.images.map( (image,key) => (
                                        <FormGroup key={key}>
                                            {console.log(image.name)}
                                            <Label for={`prodImages_${key}`} check>
                                                <img src={`/images/products/${product._id}/${image.name}`} className="img-responsive"/>
                                            </Label>
                                            <Input name="deleteImage" id={`prodImages_${key}`} type="checkbox" value={image.name}/>
                                        </FormGroup>
                                    ))}
                                    <div className="form-controls">
                                        <Button type="submit">Delete</Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </Modal>
                    </div>
                )}
            </Grid>
        )
    }
}