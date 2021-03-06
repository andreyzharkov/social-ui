import React, { Component } from 'react';
import Header from './Header'
import Footer from './Footer'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="app">
          <Header/>
          <main className="content"></main>
          <Footer/>
      </div>
    );
  }
}

export default App;
