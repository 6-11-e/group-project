import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import {Provider, Subscribe} from 'unstated';
import MainContainer from './store/main';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
//PageLoaders
import Admin from './Components/Admin/pages/Admin';
import Public from './Components/Public/Public';

import Logout from './Components/Logout/Logout';

class App extends Component {
  //Testing Component

  //Define state
  // state = {
  //   token: null,
  //   user: {},
  //   isLoggedIn: false
  // };
  constructor(props) {
    super(props);
    //Bind 'this' to functions so they can be passed to child components and be able
    // to update the global state.
    // this.updateTokenState = this.updateTokenState.bind(this);
    // this.updateUserState = this.updateUserState.bind(this);
    
    
  }
  //Seperate the token information from userData. (Temporary)
  // updateTokenState(token) {
  //   this.setState({token: token});
  //   sessionStorage.setItem('token', token)
  //   this.setState({isLoggedIn: true})
  // }

  //Update state to include userData
  // updateUserState(userData){
  //   this.setState({user: userData});
  //   sessionStorage.setItem('user', JSON.stringify(userData));
  // }

  componentDidMount() {
  }
  
  render() {
    return (

      <div className="App">
        {/* <Header onTokenChange={this.updateTokenState} onUserChange={this.updateUserState} state={this.state}/>
        <Route path='/' exact component={MyJumbotron} />
        <Route path='/gallery' component={Gallery} />
        <Route path='/profile' component={Profile} />
        <Route path='/api/store/product/' component={MyProduct} /> */}
        <Provider>
          <Subscribe to={[MainContainer]}>
            {mainContainer => (
              <Switch>
                <Route path="/logout" render={(props) => <Logout {...props} state={mainContainer.state} logout={mainContainer.logout}/>} />
                <Route path='/admin' render={(props) => <Admin {...props} state={mainContainer.state} />} />
                <Route path='/' render={(props) => <Public {...props} onTokenChange={mainContainer.updateToken} onUserChange={mainContainer.updateUser} state={mainContainer.state}/>}/>
                
              </Switch>
            )}
          </Subscribe>
        
        </Provider>
        {/* <Route path='/admin' component={Dashboard} state={this.state}/> */}
        {/* <p>{this.state.token?this.state.token:''}</p> */}
        {/* <Footer /> */}
      </div>

      
    );
  }
}

export default App;
