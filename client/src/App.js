import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Components/Header';
import Footer from './Components/Footer'
//import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <h1 className="App-intro">
          Here is where the front-end of our app will live
        </h1>
        <Footer />
      </div>
    );
  }
}

export default App;
