import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/User/App';
import Admin from './components/Admin/Admin';
import NewUser from './components/NewUser';
import registerServiceWorker from './registerServiceWorker';

/* This is the main page. Note the state of local storage. On its basis we make selections */
if(!localStorage.getItem('user')) {

    var user = {
        username: '',
        isadmin: false,
        isloggedin: false
    };

    localStorage.setItem('user', JSON.stringify(user));
}
if (JSON.parse(localStorage.getItem('user')).isloggedin === false) {
    ReactDOM.render(<NewUser />, document.getElementById('root'));
}
else if(JSON.parse(localStorage.getItem('user')).isadmin === false){
    ReactDOM.render(<App />, document.getElementById('root'));
}
else {
    ReactDOM.render(<Admin />, document.getElementById('root'));
}

registerServiceWorker();
