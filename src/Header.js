import React, { Component } from 'react';
import './Header.css';

class Header extends Component {

    render() {
        return (
            <header className="header">
                <nav>
                    <span className="header-appname">
                        <img src='/icons/logo.svg' className="header-logo" alt="logo" />
                        Social Network
                    </span>
                    <span className="header-menu-element" onClick={this.props.handleLogout}>Logout</span>
                    <span className="header-menu-element">People</span>
                    <span className="header-menu-element">My profile</span>
                </nav>
            </header>
        );
    }
}

export default Header;
