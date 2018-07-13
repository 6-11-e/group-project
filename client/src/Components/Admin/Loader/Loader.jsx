import React from 'react';

export default class Loader extends React.Component {
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