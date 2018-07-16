import React from 'react';
import {Redirect} from 'react-router'

export default class Logout extends React.Component {
    constructor(props){
        super(props)
        this.state = this.props.state;
    }
    componentWillMount(){
        //unset user, token
        this.props.logout();
    }
    render(){
        return <Redirect to="/"/>
    }
}