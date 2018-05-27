import React, { Component } from 'react';
import logo from './logo.svg';
import './Header.css';

class Header extends Component {
    render() {
        return (
            <header className="header">
                <nav>
                    <span className="header-appname">
                        <img src={logo} className="header-logo" alt="logo" />
                        Social Network
                    </span>
                    <span className="header-menu-element">Logout</span>
                    <span className="header-menu-element">People</span>
                    <span className="header-menu-element">My profile</span>
                </nav>
            </header>
        );
    }
}

export default Header;
