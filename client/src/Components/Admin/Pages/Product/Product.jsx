import React from 'react';
import {
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    // CardFooter,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Modal,
    ModalHeader,
    ModalBody,
    // ModalFooter,
    InputGroup,
    InputGroupAddon
} from 'reactstrap';
import Loader from '../../Loader/Loader';
// import AutoSuggestTagsInput from '../../AutoSuggestTagsInput/AutoSuggestTagsInput';
import { toast, Slide } from 'react-toastify';
import './style.css';

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
        this.state.uploadFiles = [];
        this.toggleModal = this.toggleModal.bind(this);
        this.imageFormSubmit = this.imageFormSubmit.bind(this)
        this.showUploadModal = this.showUploadModal.bind(this)
        this.toggleUploadModal = this.toggleUploadModal.bind(this)
        this.uploadFormSubmit = this.uploadFormSubmit.bind(this)
        this.deleteFormSubmit = this.deleteFormSubmit.bind(this)
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
        this.state.deleteModal = false;
        this.showDeleteModal = this.showDeleteModal.bind(this)
        this.updateFileList = this.updateFileList.bind(this)

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
            inStock: parseInt(data.get('inStock'), 10),
            categories: selectedCats,
            description: data.get('description'),
            images: this.state.data.product.images,
            primaryImage: this.state.data.product.primaryImage
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
    updateFileList(e){
        let fileData = e.target.files;
        // let fileContainer = document.getElementById('fileList');
        let files = []
        for(let file of fileData){
            files.push({name: file.name, size: file.size})
        }
        files = files.map( file => (
            <li className="fileListItem">
                <div className="fileName">{file.name}</div>
                <div className="fileSize">{this.formatBytes(file.size)}</div>
            </li>
        ));
        this.setState({uploadFiles: files})

    }
    formatBytes(a,b){if(0===a)return"0 Bytes";var c=1024,d=b||2,e=["Bytes","KB","MB","GB","TB","PB","EB","ZB","YB"],f=Math.floor(Math.log(a)/Math.log(c));return parseFloat((a/Math.pow(c,f)).toFixed(d))+" "+e[f]}
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
                if(selectedImg === images[image].name){
                    if(images[image].primary === true) delPrimary = false;
                    images.splice(image, 1)
                }
            }
        }
        console.log('after',images)
        var {data} = this.state;
        data.product.images = images;
        if(delPrimary === true) data.product.images[0].primary = true;
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

        // let prodImages = []
        // let {images} = this.state.data.product
        // let x = null
        // for(let image in images){

            // x = images[image]
            // if(x.name === selection){
            //     x.primary = true;
                
            // } else {
            //     x.primary = false;
            // }
            // prodImages.push(x)
        // }
        let {data} = this.state;
        // data.product.images = prodImages;
        data.product.primaryImage = selection;
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
                    return false;
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
                                                                <img src={`/images/products/${product._id}/${product.primaryImage}`} alt="Primary" className="img-responsive"/>
                                                            ):(
                                                                <img src={`https://placehold.it/400&text=No%20Image`} alt="Primary" className="img-responsive"/>
                                                            )}
                                                            
                                                        </span>
                                                        <span className="imgsBtn">
                                                            <Button color="success" block onClick={this.toggleModal}><i className="fal fa-images fa-fw"></i> Image Manager</Button>
                                                        </span>
                                                    </div>
                                                </Col>
                                                {/* Primary Form */}
                                            
                                                <Col xs="12" md="6" >
                                                    <Row>
                                                        <Col xs="12" md="6" >
                                                            <FormGroup row>
                                                                <Label for="name">Name</Label>
                                                                    <Input type="text" name="name" id="name" placeholder="Product Name..." className="form-control" defaultValue={product.name}/>
                                                            </FormGroup>
                                                        </Col>   
                                                        <Col xs="12" md={{size: 4, offset: 1}} > 
                                                            <FormGroup row>
                                                                <Label for="price">Price</Label>
                                                                <InputGroup>
                                                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                                                <Input type="number" name="price" id="price" className="form-control" min="0.00" step="0.01" defaultValue={product.price}/>
                                                                </InputGroup>
                                                                
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    <Row>
                                                        <Col xs={12} md={6}>
                                                        <FormGroup inline check>
                                                            <Label check>
                                                                <Input type="checkbox" name="deleted" checked={product.deleted} onChange={this.handleDeletedChange} sm={6} md={4} /> Remove Product?
                                                            </Label>
                                                        </FormGroup>
                                                        </Col>
                                                        <Col xs={12}  md={{size: 4, offset: 1}} >
                                                            <FormGroup row>
                                                                <Label for="inStock" sm={12}>In Stock</Label>
                                                                <Col sm={12}>
                                                                    <Input type="number" id="inStock" name="inStock" className="form-control" defaultValue={product.inStock} />
                                                                </Col>
                                                            </FormGroup>
                                                        </Col>   
                                                    </Row>
                                                </Col>
                                                <Col xs={12} md={3}>
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
                                            
                                            
                                            <Col xs={12} md={{size: 9, offset: 3}}>
                                                <Label for="description">Description</Label>
                                                <Input type="textarea" name="description" id="description" defaultValue={product.description} /> 
                                            </Col>
                                            
                                        </Row>
                                        <Row>
                                            <div className="formButtons">
                                                <Button color="secondary" onClick={this.handleGoBack}><i className="fal fa-fw fa-ban"></i> Cancel</Button>
                                                <Button color="success" type="submit"><i className="fal fa-fw fa-check"></i> Save</Button>
                                            </div>
                                        </Row>
                                        </Form>
                                    </CardBody>
                                </Card>
                                {/* Cool to have performance details here in another card */}
                            </Col>
                        </Row>
                        <Modal centered isOpen={this.state.modalShow} toggle={this.toggleModal} className="prodImgModal" >
                            <ModalHeader toggle={this.toggleModal}>
                                Image Manager <small>Primary Image</small>
                                <span className="pull-right">
                                    <Button onClick={this.showUploadModal} color="primary" size="sm"><i className="fal fa-upload"></i> Upload</Button>
                                </span>
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.imageFormSubmit}>
                                <Row>
                                {product.images.map( (image, key) => (
                                    <Col xs={12} md={3} key={key}>
                                    <FormGroup key={key}>
                                        <Label for={`prodImages_${key}`} check>
                                            <img src={`/images/products/${product._id}/${image.name}`} alt="Primary" className="img-responsive"/>
                                        </Label>
                                        <Input id={`prodImages_${key}`} name="primaryImage" type="radio" value={image.name}/>
                                        <span className="select"></span>
                                    </FormGroup>
                                    </Col>
                                ))}
                                </Row>
                                <div className="formButtons">
                                    <Button onClick={this.showDeleteModal} color="danger"><i className="fal fa-fw fa-trash"></i> Delete</Button>
                                    <Button type="submit" color="success"><i className="fal fa-fw fa-check"></i> Select</Button>
                                </div>
                                </Form>
                            </ModalBody>
                        </Modal>
                        <Modal centered isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal} className="deleteModal">
                            <ModalHeader toggle={this.toggleDeleteModal}>
                                Image Manager <small>Delete Images</small>
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.deleteFormSubmit}>
                                    <Row>
                                    {product.images.map( (image,key) => (
                                        <Col xs={12} md={3} key={key}>
                                        <FormGroup key={key}>
                                            {console.log(image.name)}
                                            <Label for={`prodImages_${key}`} check>
                                                <img src={`/images/products/${product._id}/${image.name}`} className="img-responsive" alt="Primary"/>
                                            </Label>
                                            <Input name="deleteImage" id={`prodImages_${key}`} type="checkbox" value={image.name}/>
                                            <span className="select"></span>
                                        </FormGroup>
                                        </Col>
                                    ))}
                                    </Row>
                                    <div className="formButtons">
                                        <Button color="secondary" onClick={this.showDeleteModal}><i className="fal fa-fw fa-ban"></i> Cancel</Button>
                                        <Button type="submit" color="danger"><i className="fal fa-fw fa-trash"></i> Delete</Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </Modal>
                        <Modal centered isOpen={this.state.uploadModal} toggle={this.toggleUploadModal} className='imageUploadModal'>
                            <ModalHeader toggle={this.toggleUploadModal}>
                                Image Manager <small>Upload Image</small>
                            </ModalHeader>
                            <ModalBody>
                                <Form onSubmit={this.uploadFormSubmit} encType="multipart/form-data">
                                    <div className="fileContainer">
                                        {this.state.uploadFiles.length > 0 ? (''):(<h3 className="fileContainerText"><i className="fal fa-images"></i> No Files Selected</h3>)}
                                        <ul id="fileList">
                                            {this.state.uploadFiles}
                                        </ul>
                                        <Label for="newImages">
                                        <div color="primary" type="button" className="btn btn-primary btn-upload"><i className="fal fa-fw fa-image"></i> Select Files</div>
                                        </Label>
                                        <Input type="file" name="newImages" id="newImages" accept='image/*' onChange={this.updateFileList} multiple hidden/>
                                    </div>
                                    <div className="formButtons">
                                        <Button color="secondary" type="button" onClick={this.toggleUploadModal}><i className="fal fa-fw fa-ban"></i> Cancel</Button>
                                        <Button type="submit" color="success"><i className="fal fa-upload fa-fw"></i> Upload</Button>
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