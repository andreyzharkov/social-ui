import React, { Component } from 'react';
import logo from './logo.svg';
import {logout} from "./api";
import './Header.css';

class Header extends Component {
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        this.props.logged_in = false;
        logout();
    }

    render() {
        return (
            <header className="header">
                <nav>
                    <span className="header-appname">
                        <img src={logo} className="header-logo" alt="logo" />
                        Social Network
                    </span>
                    <span className="header-menu-element" onClick={this.handleLogout}>Logout</span>
                    <span className="header-menu-element">People</span>
                    <span className="header-menu-element">My profile</span>
                </nav>
            </header>
        );
    }
}

export default Header;
