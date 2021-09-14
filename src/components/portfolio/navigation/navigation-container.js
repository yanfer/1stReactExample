import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

export default class NavigationContainer extends Component {
    constructor(){ 
        super();

    }



    render() {
        return (
            <div className="nav-wrapper">
                <div className="left-side">
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/about-me" activeClassName="nav-link-active">About</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/contact" activeClassName="nav-link-active">Contact</NavLink>
                    </div>
                    <div className="nav-link-wrapper">
                        <NavLink exact to="/Blog" activeClassName="nav-link-active">Blog</NavLink>
                    </div>
                    {/* <div className="nav-link-wrapper">
                        {true ? <button>Add Blog</button> : null}
                    </div> */}
                </div>
                
                <div className="right-side">
                    YANFER ARAQUE
                </div>
            </div>
        );
    }
}