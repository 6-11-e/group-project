import React, { Component } from 'react';
import { render } from 'react-dom';
import Header from './Components/Header';
import Footer from './Components/Footer'
//import logo from './logo.svg';
import './App.css';
import Jumbotron from './Components/Jumbotron';
import MainJumbotron from './Components/Jumbotron';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <MainJumbotron />
        <Footer />
      </div>
    );
  }
}

export default App;
