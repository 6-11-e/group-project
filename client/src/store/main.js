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
        isLoggedIn: false,
        cart: {
            items:[
                {
                    _id:"5b2f294ee7179a5b7ab879c7",
                    qty:10
                },
                {
                    _id:"5b2f29e2e7179a5b7ab879df",
                    qty:3
                },
                {
                    _id:"5b2f29fae7179a5b7ab879e3",
                    qty:71
                },
                {
                    _id:"5b2f2a1de7179a5b7ab879e8",
                    qty:13
                }
            ],
            total:2909.03
        }
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