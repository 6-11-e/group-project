import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import {Route, BrowserRouter, Switch, Link} from 'react-router-dom';


ReactDOM.render(
    <BrowserRouter>
    <App />
    </BrowserRouter>, 
    document.getElementById('root'));
// registerServiceWorker();
