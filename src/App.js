import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import Feed from './Feed'
import Profile from './Profile'
import {get_id, is_logged_in, logout} from './api'
// import {PropsRoute} from './wrappings'
import './App.css';

const renderMergedProps = (component, ...rest) => {
    const finalProps = Object.assign({}, ...rest);
    return (
        React.createElement(component, finalProps)
    );
};

const PropsRoute = ({ component, ...rest }) => {
    return (
        <Route {...rest} render={routeProps => {
            return renderMergedProps(component, routeProps, rest);
        }}/>
    );
};

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged_in: is_logged_in()
        };

        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(){
        logout();
        this.setState({
            logged_in: false,
        });
    }

    render() {
        return this.state.logged_in ? (
            <div className="app">
                <Header handleLogout={this.handleLogout}/>
                <main className="content">
                    <Switch>
                        <Route exact path='/' render={() => (<Redirect to="/feed"/>)}/>
                        <PropsRoute exact path='/feed' component={Feed} userId={get_id()} type='feed'/>
                        <Route exact path='/profile/:number' component={Profile} />
                    </Switch>
                </main>
                <Footer className="footer"/>
            </div>
        ) : (
            <main>
                <Header />
                <Start/>
                <Footer/>
            </main>
        );
    }
}

export default App;
