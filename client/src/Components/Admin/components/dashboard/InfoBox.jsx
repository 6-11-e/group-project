import React from 'react';
import './InfoBox.css';
class InfoBox extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
            data: 0
        }
    }
    className = 'infoBoxIcon ' + this.props.bgColor;
    iconName = 'fal fa-lg ' + this.props.icon;
    data = this.props.data;
    componentDidMount() {
        console.log('InfoBox', this.data)
        this.setState({data: this.data})
    }
    // componentWillReceiveProps(nextProps) {
    //     console.log('InfoBox', nextProps)
    //     if(nextProps !== this.props){
    //         this.setState({data: nextProps.data})
    //     }
    // }
    render() {
        return(
            <div className="infoBox">
                <span className={this.className}>
                    <i className={this.iconName}></i>
                </span>
                <div className="infoBoxContent">
                    <span className="infoBoxText">{this.props.text}</span>
                    <span className="infoBoxNumber">{this.state.data}</span>
                </div>
            </div>
        )
    }
}

export default InfoBox;