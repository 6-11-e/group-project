import {Container} from 'unstated';

class MainContainer extends Container {
    constructor(){
        super()
        this.logout = this.logout.bind(this)
        let token = JSON.parse(sessionStorage.getItem('token'))
        let user = JSON.parse(sessionStorage.getItem('user'));
        if(token) this.state.token = token;
        if(user) {this.state.user = user; this.state.isLoggedIn = true}
        //check if user is admin, set this.state.isAdmin = true

    }
    state = {
        token: '',
        user: {

        },
        isLoggedIn: false
    }
    logout(){
        this.updateToken(null)
        this.updateUser(null)


    }

    updateToken = newToken => {
        this.setState({token: newToken})
        sessionStorage.setItem('token', JSON.stringify(newToken))
        this.setState({isLoggedIn: true})
    }
    updateUser = userData => {
        this.setState({user: userData})
        sessionStorage.setItem('user', JSON.stringify(userData))
    }
    updateCart = newCart => {
        this.setState({cart: newCart});
        sessionStorage('cart', JSON.stringify(newCart))
    }
}
export default MainContainer;