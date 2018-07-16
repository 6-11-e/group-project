import React from 'react'
import{
    Container as Grid,
    Row,
    Col,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    CardText,
    Button,
    Form,
    FormGroup,
    Label,
    Input
  } from 'reactstrap';
  import Loader from '../../Loader/Loader';

  export default class Category extends React.Component {
      constructor(props){
          super(props)
          this.state = this.props.state;
          this.state.data = {};
          this.state.catID = this.props.match.params.id;
          this.state.done = false;
          this.handleFPCheckBox = this.handleFPCheckBox.bind(this);
          this.handleFormSubmit = this.handleFormSubmit.bind(this);
          this.handleGoBack = this.handleGoBack.bind(this)
      }

      getCategory(){
          this.setState({done: false})
          fetch(`/api/store/category/id=${this.state.catID}`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.token
              }
          })
          .then( response => {
              if(response.ok === true){
                  return response.json();
              }
              return response.statusText
          })
          .then( response => {
              var data = this.state.data;
              data = response.data;
              this.setState({data});
          })
          .then( () => {
              this.setState({done: true})
          })
      }
      componentWillMount() {
          this.getCategory();
      }
      handleFPCheckBox(){
          let data ={}
          data.category = this.state.data.category;
          data.category.showFP = !data.category.showFP;
          this.setState({data})
      }
      handleFormSubmit(event){
          event.preventDefault();
          let data = new FormData(event.target)
          
          data = this.validateForm(data)
          
          this.setState({done: false});
          fetch(`/api/store/category/edit/${this.state.catID}`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': this.state.token
              },
              body: JSON.stringify(data),
              method: 'POST'
          })
          .then(response => {
              if(response.ok === true){
                  return response.json()
              }
              return response.statusText;
          })
          .then( response => {
              //Do other things with response, like triggering Toastify
              if(response.status == "error"){
                  console.log(response.data.error)
              }
          })
          .then( () => {
            //   this.setState({done: true})
            this.getCategory()
          })
          
      }

      validateForm(formData){
          let data = formData;
          let cat = {
            name: data.get('name'),
            description: data.get('description'),
            showFP: data.get('showFP')
          };
          //Iterate through and use validator;

          //Done, no errors
          return cat;
      }
      handleGoBack(){
          this.props.history.goBack()
      }
      render() {
          const {category} = this.state.data;
          return(
            <Grid>
                {this.state.done !== true ? (<Loader/>) : (
                    <div>
                        <Row>
                            <div className="pageHeader">
                                <h1>Category Management</h1>
                            </div>
                        </Row>
                        <Row>
                            <Col xs="12">
                                <Card>
                                    <CardHeader>Category Details</CardHeader>
                                    <CardBody>
                                        <Form onSubmit={this.handleFormSubmit}>
                                            <Row>
                                                <Col xs="12" md="9">
                                                    <CardTitle>{category.name}</CardTitle>
                                                    <Row>
                                                        <Col xs="2">
                                                            <Label for="name">Name</Label><br/><br/>
                                                            <Label for="description">Description</Label>
                                                        </Col>
                                                        <Col  xs={10}>
                                                            <Input id="name" name="name" type="text" className="form-control" defaultValue={category.name} placeholder="Category Name..."/><br/>
                                                            <Input id="description" name="description" type="textarea" className="form-control" defaultValue={category.description} placeholder="Category Description..."/><br/>
                                                            <FormGroup check inline>
                                                                <Label check>
                                                                    <Input type="checkbox" id="showFP" name="showFP" checked={category.showFP} onChange={this.handleFPCheckBox}/> Show on Frontend?
                                                                </Label>
                                                            </FormGroup>
                                                        </Col>
                                                    </Row>
                                                    {/* Form
                                                        Remember to define Form above so under this row(cols for cat info and buttons) formsubmit can be set to pull-right
                                                    */}
                                                </Col>
                                                <Col xs="12" md="3">
                                                    {/* Button to Delete modal */}
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col xs="12" md={{size: 4, offset: 8}}>
                                                    <div className="formControls">
                                                        <Button color="secondary" onClick={this.handleGoBack}>Cancel</Button>&nbsp;
                                                        <Button color="primary" type="submit">Save</Button>

                                                    </div>
                                                </Col>
                                            </Row>
                                        </Form>
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