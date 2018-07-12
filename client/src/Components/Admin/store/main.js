import {Container} from 'unstated';

class MainContainer extends Container {
    state = {
        token: 'JWT eyJhbGciOiJIUzI1NiJ9.NWIyZDc5ZDlhZWIwNDg0ZjQ5N2EwN2Nl.QSwbDCi3Jr8D2d5TKfBb6ASbbzqe9xeoGtG6AnuDYWU',
        user: {
            firstName: 'TEST',
            lastName: '',
        }
    }

    updateToken = newToken => {
        this.setState({token: newToken})
    }
    updateUser = userData => {
        this.setState({user: userData})
    }
}
export default MainContainer;