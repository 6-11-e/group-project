import React from 'react';
import {
    Grid,
    Row,
    Col,
    PageHeader
} from 'react-bootstrap';
import InfoBox from '../../components/dashboard/InfoBox';


class Home extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            loading: false,
            token: '',
            data: {
                infoBars: {
                    users: {count: 0},
                    sales: {count: 0},
                    pendingOrders: {count: 0},
                    products: {count: 0}
                }
            }
        }
        this.getDashboardData = this.getDashboardData.bind(this)
    }
    getDashboardData(token) {
        if(this.state.token === ''){
            this.setState({loading: true});
            fetch('/api/admin/dashboardMetrics', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': token
                }
            })
            .then(response => {

                if(response.ok === true){
                    return response.json();
                }
                return response.statusText; //Return null instead, in next .then, check if null or undefined. if false, call method to update state
            })
            .then(response => {
                console.log('Response', response)
                var data = this.state.data
                console.log('preMod',data)
                data = response.data;
                console.log('postMod',response.data)
                this.setState({data: response.data})

                
            })
            .then( () => {
                
                this.setState({loading: false})
            })
        }
    }
    componentWillMount(){
        if(this.props.token === null){
            //Attempt to retrieve token from localStorage
            if(sessionStorage.getItem('token')){
                let token = sessionStorage.getItem('token');
                this.setState({token: token})
                this.getDashboardData(token)
            }
        } else {
            this.setState({token: this.props.token});
            this.getDashboardData(this.props.token)
        }
        console.log('WillMountHOME', this.props)
        
    }
    componentDidMount(){
        
    }
    
    // componentWillReceiveProps(nextProps){
    //     if (nextProps.token !== this.state.token) {
    //         this.setState({token: this.props.token});

    //         this.getDashboardData(nextProps.token);
    //     }
        
    // }
    
    render() {
        const {loading} = this.state;
        console.log('State', this.state)
        var {infoBars} = this.state.data;
        
        return (
        <div>
            {loading ? <div>Loading...</div>: (
                
                <Grid fluid>
                    <Row>
                        <Col xs={12}>
                            <PageHeader>
                                Dashboard
                            </PageHeader>
                        </Col>
                    </Row>
                    
                    <Row>
                        <Col xs={3}>
                            {console.log(infoBars.users)}
                            <InfoBox bgColor="bg-aqua" icon="fa-users" text="Users" data={infoBars.users.count}/>
                        </Col>
                        <Col xs={3}>

                            <InfoBox bgColor="bg-green" icon="fa-file-invoice-dollar" text="Sales" data={infoBars.sales.count}/>
                        </Col>
                        <Col xs={3}>
                            <InfoBox bgColor="bg-red" icon="fa-boxes" text="Products" data={this.state.data.infoBars.products.count} />
                        </Col>
                        <Col xs={3}>
                            <InfoBox bgColor="bg-yellow" icon="fa-ramp-loading" text="Pending Orders" data={this.state.data.infoBars.pendingOrders.count} />
                        </Col>
                    </Row>
                    
                </Grid>
            )}
        </div>    
        )
    }
}

export default Home;