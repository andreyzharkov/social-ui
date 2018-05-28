import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import Feed from './Feed'
import Api from './api'
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: Api.getAuthToken(),
            loading: true,
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.resetState = this.resetState.bind(this);
        console.log(this.state.token);
    }

    componentWillMount() {
        let userInfo;
        let this_ = this;
        if (this.state.token) {
            fetch(`http://social-webapi.azurewebsites.net/api/users/me/`, {
                method: 'GET',
                headers: {
                    'Authorization': 'Bearer ' + this.state.token,
                    'content-type': 'application/json'
                },
            })
                .then(res => res.json())
                .then((data) => {
                    console.log("me:");
                    console.log(data);
                    // setToken
                    userInfo = data;
                    self.setState({
                        token: Api.getAuthToken(),
                        loading: false,
                        userInfo: userInfo,
                    });
                    console.log("STATE CHANGED");
                })
                .catch(error => this.setState({error, errorMessage: error.message}));
        }
    }

    handleLogout(){
        Api.removeAuthToken();
        this.setState({
            token: Api.getAuthToken(),
            loading: false,
            userInfo: this.state.userInfo,
        });
        console.log('logout');
        this.forceUpdate();
    }

    resetState(){
        console.log("resetState called");
        this.setState({
            token: Api.getAuthToken(),
            loading: false,
            userInfo: this.state.userInfo,
        });
        this.forceUpdate();
    }

    render() {
        if (this.state.loading){
            return (<div>LOADING</div>)
        }
        return (
            <div className="app">
                <Header handleLogout={this.handleLogout} />
                <main className="content">
                    <Switch>
                        <Route exact path='/' render={() => (
                            this.state.token ? (
                                <Redirect to="/feed"/>
                            ) : (<Start updateParent={this.resetState}/>)
                        )}/>
                        <Route exact path='/feed' render={() =>
                            <div className="feed">
                                {console.log(this.userInfo)}
                                <Feed userId={this.userInfo.id} type='feed'/>
                            </div>
                        }/>
                        {/*<Route exact path='/profile/:number' component={Profile} />*/}
                        {/*<Route exact path='/edit' component={EditProfile} />*/}
                        {/*<Route exact path='/users' component={Users} />*/}
                    </Switch>
                </main>
                <Footer/>
            </div>
        );
    }
}

export default App;
