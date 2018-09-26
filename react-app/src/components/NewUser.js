import React, { Component } from 'react';
import NewPerson from './NewPerson';
import Home from './Home';
import Login from './Login';

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
/* This will be shown when localstorage is logged out. Its a basic navbar */
class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/NewPerson'}>Sign-Up</Link></li>
                  <li><Link to={'/Login'}>Login</Link></li>
                </ul>
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
