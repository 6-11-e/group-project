import React from 'react';
import {
    Grid,
    Row,
    Col,
    PageHeader
} from 'react-bootstrap';
import InfoBox from '../../components/dashboard/InfoBox';

class Home extends React.Component {
    componentDidMount(){
        // fetch('/api/admin/dashboardMetrics')
        // .then(response => {
        //     // console.log(response)
        //     if(response.ok === true){
        //         return response.json();
        //     }
        //     return response.statusText; //Return null instead, in next .then, check if null or undefined. if false, call method to update state
        // })
        // .then(response => {
        //     console.log(response);
        // })
    }
    render() {
        return (
            <Grid fluid>
                {/* Page Header */}
                <Row>
                    <Col xs={12}>
                        <PageHeader>
                            Dashboard
                        </PageHeader>
                    </Col>
                </Row>

                {/* Badge Boxes */}
                <Row>
                    <Col xs={3}>
                        <InfoBox bgColor="bg-aqua" icon="fa-users" text="Users" data="12"/>
                    </Col>
                    <Col xs={3}>
                        <InfoBox bgColor="bg-green" icon="fa-file-invoice-dollar" text="Sales" data="6"/>
                    </Col>
                    <Col xs={3}>
                        <InfoBox bgColor="bg-red" icon="fa-boxes" text="Products" data="14" />
                    </Col>
                    <Col xs={3}>
                        <InfoBox bgColor="bg-yellow" icon="fa-ramp-loading" text="Pending Orders" data="2" />
                    </Col>
                </Row>
            </Grid>
        )
    }
}

export default Home;