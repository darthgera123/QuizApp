import React, { Component } from 'react';

import PlayQuiz from './PlayQuiz.js'
import Home from './Home.js';
import Login from '../Login.js';

import Leaderboard from './Leaderboard.js'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class App extends Component {

  HandleSignOut = () => {
    var user = {
        username : '',
        isadmin : false,
        isloggedin : false
    };

    localStorage.setItem('user', JSON.stringify(user));
    window.location.reload();
}


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
                    <li><Link to={'/'}>Home</Link></li>
                    <li><Link to={'/PlayQuiz'}>Play Quiz</Link></li>
                    <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  </ul>

                  <ul className="nav navbar-nav navbar-right">
                    <li>
                      <Link to={'/'}> 
                        <b>{JSON.parse(localStorage.getItem('user')).username.toUpperCase()}</b>
                        <button className="btn btn-danger" onClick={this.HandleSignOut}>Sign Out</button>
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path ='/PlayQuiz' component={PlayQuiz}/>
                 <Route exact path = '/Leaderboard' component={Leaderboard}/>
                 <Route exact path='/Login' component={Login} />
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
