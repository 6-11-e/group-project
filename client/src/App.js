import React, { Component } from 'react';
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
    //Below, under the <h1></h1>, is a conditional. If the state value specified is set
    //then it will output everything after the &&
    //Typically logic should not be performed in such a way, but instead in a separate
    //function and then either called directly (for same component) or passed as prop
    // (to child component).
    return (
      <div className="App">
        {/* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header> */}
        <h1 className="App-intro">
          Here is where the front-end of our app will live
        </h1>
        {this.state.version && <h3>API Version {this.state.version}</h3>}
        
      </div>
    );
  }
}

export default App;
