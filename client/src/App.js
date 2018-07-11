import React, { Component } from 'react';
// import { render } from 'react-dom';
// import Header from './Components/Header';
// import Footer from './Components/Footer';
// import Gallery from './Components/Public/pages/gallery/Gallery';
// import MyJumbotron from './Components/Jumbotron';
// import Profile from './Components/Profile';
import {Route, Switch} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';
// import MyProduct from './Components/Product';
import Dashboard from './Components/Admin/Dashboard';
import Public from './Components/Public/Public';



class App extends Component {
  //Testing Component

  //Define state
  state = {
    token: null,
    user: {},
    isLoggedIn: false
  };
  constructor(props) {
    super(props);
    //Bind 'this' to functions so they can be passed to child components and be able
    // to update the global state.
    this.updateTokenState = this.updateTokenState.bind(this);
    this.updateUserState = this.updateUserState.bind(this);
    
  }
  //Seperate the token information from userData. (Temporary)
  updateTokenState(token) {
    this.setState({token: token});
    sessionStorage.setItem('token', token)
    this.setState({isLoggedIn: true})
  }

  //Update state to include userData
  updateUserState(userData){
    this.setState({user: userData});
    sessionStorage.setItem('user', JSON.stringify(userData));
  }

  componentDidMount() {
    //Check if token and userdata is set in session, load it into app.
    // The only data to be accepted by the server is the token to prevent
    // user/account manipulation on frontend.
    if(sessionStorage.getItem('token')) {
      this.updateTokenState(sessionStorage.getItem('token'));
      this.updateUserState(JSON.parse(sessionStorage.getItem('user')));
    }
    //Perform fetch inside this method
    fetch('/api/version')
    .then(res => {
      console.log(res);
      return res.json()})
    .then(res => {
      //API will return 'ok' if the request was successful.
      //For errors (both logic and http (ie 404) status will be 'error' and 'message' will have text to describe it)
      if(res.status !== 'ok') {
        //If there is an error, we will log it
        console.log(res.message);
      } else {
        this.setState(res.data)
      }
    })
  }
  
  render() {
    return (

      <div className="App">
        {/* <Header onTokenChange={this.updateTokenState} onUserChange={this.updateUserState} state={this.state}/>
        <Route path='/' exact component={MyJumbotron} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/profile' component={Profile} />
        <Route path='/api/store/product/' component={MyProduct} /> */}
        <Switch>
          <Route path='/admin' render={(props) => <Dashboard {...props} state={this.state} token={this.state.token} onTokenChange={this.updateTokenState} onUserChange={this.updateUserState}/>}/>
          <Route path='/' render={(props) => <Public {...props} onTokenChange={this.updateTokenState} onUserChange={this.updateUserState} state={this.state}/>}/>
        </Switch>
        
        {/* <Route path='/admin' component={Dashboard} state={this.state}/> */}
        {/* <p>{this.state.token?this.state.token:''}</p> */}
        {/* <Footer /> */}
      </div>

      
    );
  }
}

export default App;
