import {Container} from 'unstated';

class MainContainer extends Container {
    constructor(){
        super()
        this.logout = this.logout.bind(this)
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