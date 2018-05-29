import React, {Component} from 'react';
import {Redirect} from 'react-router-dom'
import {login} from './api'

class Start extends Component {

    constructor(props) {
        super(props);

        this.state = {
            postId: null,
            errorMessage: "",
            doRemember: false,
        };

        this.onSubmit = this.onSubmit.bind(this);
        this.setCurrentUserId = this.setCurrentUserId.bind(this);
    }

    onSubmit(event, type) {

        event.preventDefault();

        let formData = new FormData(event.target);

        let data = {};
        let this_ = this;
        formData.forEach(function(value, key) {
            if (key !== "remember") {
                data[key] = value;
            } else {
                this_.setState({doRemember: true});
            }
        });

        formData.forEach(function(value, key) {
            formData.delete(key);
        });

        fetch('http://social-webapi.azurewebsites.net/api/identity/' + type, {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(data => {
                this.setState({data, token: data.token});
                console.log(data.token);
                // setToken
                // Api.setAuthToken(data.token);
                // this_.setCurrentUserId(data.token);
                // console.log("Api:");
            })
            .catch(error => {console.log(error); this.setState({error, errorMessage: error.message})});
        this.props.updateParent();
    }

    render() {
        if (!this.props.token) {

            return (
                <div className="invite">
                    <div className="invite-header">
                        Welcome to Social Network!
                    </div>
                    <div className="invite-text">
                        Sign in or sign up before we begin
                    </div>
                    <div className="global-error global-info-inline">{this.state.errorMessage}</div>
                    <div className="invite-content">
                        <div className="invite-sign">
                            <div className="invite-sign-header">Sign up</div>
                            <form onSubmit={(event) => this.onSubmit(event, 'signup')}>
                                <label>
                                    <span className="invite-sign-label">E-mail</span>
                                    <input type="email" name="email" placeholder="john@example.com" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <span className="invite-sign-label">Password</span>
                                    <input type="password" name="password" placeholder="password" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <span className="invite-sign-label">Full name</span>
                                    <input type="name" name="name" placeholder="John Watson" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <span className="invite-sign-label">Birthday</span>
                                    <input type="date" name="birthday" placeholder="Birthday" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <input type="checkbox" name="remember" defaultChecked />
                                    <span className="invite-sign-postlabel">Remember me</span><br/>
                                </label>
                                <button className="invite-sign-button">Sign up</button>
                            </form>
                        </div>

                        <div className="invite-sign">
                            <div className="invite-sign-header">Sign in</div>
                            <form onSubmit={(event) => this.onSubmit(event, 'signin')}>
                                <label>
                                    <span className="invite-sign-label">E-mail</span>
                                    <input type="email" name="email" placeholder="john@example.com" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <span className="invite-sign-label">Password</span>
                                    <input type="password" name="password" placeholder="password" className="invite-sign-input" /><br/>
                                </label>
                                <label>
                                    <input type="checkbox" name="remember" defaultChecked />
                                    <span className="invite-sign-postlabel">Remember me</span><br/>
                                </label>
                                <button className="invite-sign-button">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            );
        }
        return <Redirect to="/feed"/>;
    }
}

export default Start;
