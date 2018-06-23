import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Components/Header';
import Footer from './Components/Footer';
import Gallery from './Components/Gallery';
import MyJumbotron from './Components/Jumbotron';
import Profile from './Components/Profile';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  //Testing Component

  //Define state
  state = { status: ''};

  componentDidMount() {
    //Perform fetch inside this method
    fetch('/api/version')
    .then(res => res.json())
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
        <Header />
        <Route path='/' exact component={MyJumbotron} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/profile' component={Profile} />
        {/* <MyJumbotron /> */}
        <Footer />
      </div>
    );
  }
}

export default App;
