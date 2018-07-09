import React from 'react';
import './InfoBox.css';
class InfoBox extends React.Component {
    constructor(props) {
        super(props)
    }
    className = 'infoBoxIcon ' + this.props.bgColor;
    iconName = 'fal fa-lg ' + this.props.icon;
    render() {
        return(
            <div className="infoBox">
                <span className={this.className}>
                    <i className={this.iconName}></i>
                </span>
                <div className="infoBoxContent">
                    <span className="infoBoxText">{this.props.text}</span>
                    <span className="infoBoxNumber">{this.props.data}</span>
                </div>
            </div>
        )
    }
}

export default InfoBox;