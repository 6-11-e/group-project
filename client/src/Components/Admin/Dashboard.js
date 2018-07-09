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
    // constructor(props) {
    //     super(props);

    // this.state = {};
    // }
    componentDidMount() {
        
        // this.setState(this.props.state)
        console.log('state',this.state)
        console.log('prop.state', this.props.state)
    }
    

    
    render(){

        return (
            <div>
                <Topbar user={{firstName: 'Test Admin'}}/>
                <Grid fluid>
                    <Row>
                        <Col xs={10} md={2} style={styles.sidebar}>
                            <Sidebar />
                        </Col>{/* /Sidebar */}
                        <Col xs={12} md={10}>
                            <div className="pageDisplay">
                                <Route exact path='/admin' component={Home} />
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