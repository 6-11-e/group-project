import React from 'react';

export default class InfoBox extends React.Component {
    className = 'infoBoxIcon ' + this.props.bgColor;
    iconName = 'fal fa-fw ' + this.props.icon;

    render() {
        return(
            <div className="infoBox">
                <span className={this.className}>
                    <i className={this.iconName}></i>
                </span>
                <div className="infoBoxContent">
                    <span className="infoBoxText">
                        {this.props.title}
                    </span>
                    <span className="infoBoxData">
                        {this.props.data}
                    </span>
                </div>
            </div>
        )
    }
}