import React from 'react';
import {toast, Slide} from 'react-toastify';

export default class Loader extends React.Component {
    loadingToast = null
    componentWillMount(){
        this.loadingToast = toast('Fetching Data', {
            autoClose: false, 
            position: toast.POSITION.BOTTOM_RIGHT, 
            closeButton: false,
            transition: Slide
        })
    }
    componentWillUnmount(){
        toast.dismiss(this.loadingToast)
    }
    render() {
        return(
            <div className="pageLoader">
                <div className="spinnerBox">
                    <span className="spinnerIcon"><i className="fal fa-spinner fa-spin"></i></span>
                    <span className="spinnerText">Loading</span>
                </div>
            </div>
        )
    }
}