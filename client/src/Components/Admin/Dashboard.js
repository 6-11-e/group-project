import React from 'react';
import {Grid, Col, Row} from 'react-bootstrap';
import {Route} from 'react-router-dom';
import Topbar from './components/topbar/Topbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import Users from './pages/users/Users';
import './dashboard.css';

var styles = {
    sidebar: {
        padding: '0px'
    }
}

class Dashboard extends React.Component {
    state={
        token: this.props.token
    }
    
    
    componentWillMount(){
        // this.setState({token: this.props.state.token})
        console.log('WillMount', this.props)
    }
    componentDidMount(){
        console.log('DidMount', this.state)
    }
    // token = this.props.state.token;
    render(){
        const {token} = this.state
        console.log('Dashboard.js',this.props.state.token)
        // let token = this.props.state.token;
        // const token = this.props.state.token;
        return (
            <div>
                <Topbar username={this.props.state.user.firstName}/>
                <Grid fluid>
                    <Row>
                        <Col xs={10} md={2} style={styles.sidebar}>
                            <Sidebar />
                        </Col>{/* /Sidebar */}
                        <Col xs={12} md={10}>
                            <div className="pageDisplay">
                                
                                <Route exact path='/admin' render={(props) => <Home {...props} token={this.props.token} />} />
                                <Route path='/admin/users' component={Users} />
                            </div>
                        </Col>{/* /Page */}
                    </Row>
                </Grid>
            </div>
        )
    }
}

export default Dashboard