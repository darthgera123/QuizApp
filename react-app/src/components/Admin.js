import React, { Component } from 'react';
import DeletePerson from './DeletePerson';
import ViewPeople from './ViewPeople';
import CreateQuestion from './CreateQuestion.js'
import ViewQuestion from './ViewQuestion.js'
import DeleteQuiz from './DeleteQuiz.js'
import PlayQuiz from './PlayQuiz.js'
import Home from './Home';
import EditQuestion from './EditQuestion.js'
import Leaderboard from './Leaderboard.js'

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';


class Admin extends Component {

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
            <nav className="navbar navbar-default">
              <div className="container-fluid">
                <div className="navbar-header">
                  <Link className="navbar-brand" to={'/'}>React App</Link>
                </div>
                <ul className="nav navbar-nav">
                  <li><Link to={'/'}>Home</Link></li>
                  <li><Link to={'/DeletePerson'}>Delete Person</Link></li>
                  <li><Link to={'/ViewPeople'}>View People</Link></li>
                  <li><Link to={'/CreateQuestion'}>Create Quiz</Link></li>
                  <li><Link to={'/ViewQuestion'}>View Quiz</Link></li>
                  <li><Link to={'/DeleteQuiz'}>Delete Quiz</Link></li>
                  <li><Link to={'/PlayQuiz'}>Play Quiz</Link></li>
                  <li><Link to={'/EditQuestion'}>Edit Question</Link></li>
                  <li><Link to={'/Leaderboard'}>Leaderboard</Link></li>
                  <li><Link to={'/'}><button className="btn btn-danger" onClick={this.HandleSignOut}>Sign Out</button></Link></li>

                </ul>
              </div>
            </nav>
            <Switch>
                 <Route exact path='/' component={Home} />
                 <Route exact path='/DeletePerson' component={DeletePerson} />
                 <Route exact path='/ViewPeople' component={ViewPeople} />
                 <Route exact path ='/CreateQuestion' component={CreateQuestion}/>
                 <Route exact path ='/ViewQuestion' component={ViewQuestion}/>
                 <Route exact path ='/DeleteQuiz' component={DeleteQuiz}/>
                 <Route exact path ='/PlayQuiz' component={PlayQuiz}/>
                 <Route exact path ='/EditQuestion' component={EditQuestion}/>
                 <Route exact path = '/Leaderboard' component={Leaderboard}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default Admin;