import React, {Component} from 'react';
import {Switch, Route, Redirect} from 'react-router-dom'
import Header from './Header'
import Footer from './Footer'
import Start from './Start'
import Feed from './Feed'
import {get_id, get_token, is_logged_in} from './api'
import './App.css';

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            logged_in: is_logged_in()
        }
    }
    render() {
        return is_logged_in() ? (
            <div className="app">
                <Header logged_in={this.state.logged_in}/>
                <p>logged</p>
                {/*<main className="content">*/}
                    {/*<Switch>*/}
                        {/*<Route exact path='/' render={() => (<Redirect to="/feed"/>)}/>*/}
                        {/*<Route exact path='/login' component={Start}/>*/}
                        {/*<Route exact path='/feed' component={Feed({*/}
                            {/*userId:get_id(),*/}
                            {/*type:'feed',*/}
                        {/*})}/>*/}
                        {/*/!*<Route exact path='/profile/:number' component={Profile} />*!/*/}
                        {/*/!*<Route exact path='/edit' component={EditProfile} />*!/*/}
                        {/*/!*<Route exact path='/users' component={Users} />*!/*/}
                    {/*</Switch>*/}
                {/*</main>*/}
                <Footer/>
            </div>
        ) : (
            <main>
                <Header />
                <p>logged out</p>
                <Start/>
                <Footer/>
            </main>
        );
        return (
            <div className="app">
                <Header />
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
