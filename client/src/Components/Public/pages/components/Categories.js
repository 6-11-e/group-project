import React from 'react';
import {Link} from 'react-router-dom';
import './categories.css';

const ulContainer = {
    listStyleType: 'none',
    // height: '100vh'
    // float: 'left',
    // marginLeft: '20px'
    paddingRight: '30px'
}

let api = '/api/store/categories/public'

class Categories extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
            activeCategory: (this.props.activeCategory?this.props.activeCategory:null)
        };
    }



    componentDidMount() {
        fetch(api)
        .then(response => {
            return response.json();
        }).then(response => {
            console.log('cats', response.data)
            let categories = response.data.categories.map((category, id) => {
                let isActive = (category._id === this.state.activeCategory? ' active':'')
                return (
                    // <ul style={ulContainer}>
                        <li className={"sidebarCategory"+isActive} key={id}>
                            <Link to={"/category/" + category._id}>
                                {category.name}
                            </Link>
                        </li>
                    // </ul>
                )
            })
            this.setState({categories})
        })
    }

    render() {
        return (
            <div className="sidebarContainer">
                <h4>Categories</h4>
                <hr/>
                <ul className="categorySidebar">
                    {this.state.categories}
                </ul>
            </div>
        )
    }
}

export default Categories;