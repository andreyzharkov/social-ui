import React, { Component } from 'react';
import Api from './api'

class UserInfo extends Component {

    constructor(props) {
        super(props);

        fetch(`http://social-webapi.azurewebsites.net/api/users/me/`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + Api.getAuthToken(),
                'content-type': 'application/json'
            },
        })
            .then(res => res.json())
            .then((data) => {
                console.log(data);
                this.setState({
                    user
                })
            });

        this.state = {
            userId: props.userId,
            errorMessage: "",
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.setCurrentUserId = this.setCurrentUserId.bind(this);
    }

    render() {
        return (
            <header className="header">
                <nav>
                    <span className="header-appname">
                        <img src={logo} className="header-logo" alt="logo" />
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
