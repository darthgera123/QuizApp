import React, { Component } from 'react';
import NewPerson from './NewPerson.js';
import Home from './User/Home.js';
import Login from './Login.js';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
/* This will be shown when localstorage is logged out. Its a basic navbar */
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav id="menu-bar" className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>Quiz App</Link>
                
                <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNav">
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                  <span className="icon-bar"></span>
                </button>
                </div>
                <div className="collapse-navbar-collapse" id="myNav">
                <ul className="nav navbar-nav">
                  <li className="active"><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Sign-Up</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                </ul>
                </div>
              </div>
            </nav>
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/NewPerson' component={NewPerson} />
              <Route exact path='/Login' component={Login} />        
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
