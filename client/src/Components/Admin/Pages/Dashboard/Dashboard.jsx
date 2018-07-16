import React from 'react'
import{
    Container as Grid,
    Row,
    Col
} from 'reactstrap';
import InfoBox from './components/InfoBox/InfoBox';
import Loader from '../../Loader/Loader';

export default class Dashboard extends React.Component{
    constructor(props){
        super(props)
        this.state = this.props.state;
        this.state.loading = false;
        this.state.data = {};
        this.state.done = false;
    }
    getDashboardData() {
        // console.log('Token', this.state.token)
        if(this.state.loading === false){
            fetch('/api/admin/dashboardMetrics', {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.state.token
                }
            })
            .then( response => {
                if(response.ok === true) {
                    // console.log(response)
                    return response.json();
                }
                return response.statusText;
            })
            .then(response => {
                if(response.status == 'ok'){
                    var data = this.state.data;
                    data = response.data;
                    // console.log(response)
                    this.setState({data})
                    return true;
                }
                return false;
                
            })
            .then( (status) => {

                if(status){
                    this.setState({done: true})
                } else {
                    this.props.history.push('/')
                }
                // console.log(this.state)
                
            })
        }
    }

    componentWillMount(){
       this.getDashboardData() 
    }
    render(){
        
        if(this.state.done){
            const {infoBars} = this.state.data;
            return(
                <Grid>
                    <Row>
                        <div className="pageHeader">
                            <h1>Dashboard</h1>
                        </div>
                    </Row>
                    <Row>
                        <Col xs="6" md="3" >
                            <InfoBox data={infoBars.users.count} title="Users" icon="fa-users" bgColor="bgAqua"></InfoBox>
                        </Col>
                        <Col xs="6" md="3" >
                            <InfoBox data={infoBars.sales.count} title="Sales" icon="fa-file-invoice-dollar" bgColor="bgGreen"></InfoBox>
                        </Col>
                        <Col xs="6" md="3" >
                            <InfoBox data={infoBars.products.count} title="Products" icon="fa-boxes" bgColor="bgLightBlue"></InfoBox>
                        </Col>
                        <Col xs="6" md="3" >
                            <InfoBox data={infoBars.pendingOrders.count} title="Orders" icon="fa-ramp-loading" bgColor="bgYellow"></InfoBox>
                        </Col>
                    </Row>
                </Grid>
            )
        } else {
            return null;
        }
    }
}