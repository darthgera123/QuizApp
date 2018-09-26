import React, { Component } from 'react';
import './ViewPeople.css';
/* This is the leaderboard code. It automatically renders the overall leaderboard and you can render genre specific */
class Leaderboard extends Component{
    constructor(){
        super();
        this.state = {
            username:"",
            genres :[],
            tables:[],

        }
        this.showTable = this.showTable.bind(this);
        this.sortTable = this.sortTable.bind(this);
    }

    componentDidMount() {
        this.state.username= JSON.parse(localStorage.getItem('user')).username;
        const request = new Request('http://127.0.0.1:8080/all-genres/');
        fetch(request)
          .then(response => response.json())
            .then(genres => this.setState({genres: genres}));
        fetch('http://127.0.0.1:8080/score/')
            .then(response => response.json())
                .then(tables => this.setState({tables:tables}))
                .then(this.setState(tables => {this.state.tables.sort((a,b) => (a.total - b.total))}))
      }

    showTable(event){
        var genre = event.target.value;
        if(genre=="0")
        {
            fetch('http://127.0.0.1:8080/score/')
            .then(response => response.json())
                .then(tables => this.setState({tables:tables}))
                .then(this.setState(tables => {this.state.tables.sort((a,b) => (a.total - b.total))})) 
        }
        else{
            fetch('http://127.0.0.1:8080/score-genre/'+genre)
            .then(response => response.json())
                .then(tables => this.setState({tables:tables}))
                .then(this.setState(tables => {this.state.tables.sort((a,b) => (a.total - b.total))}))   
        }
        
    }
    sortTable(event){
        this.setState(prevState => {
            this.state.tables.sort((a, b) => (b.total - a.total))
        });


    }

    render(){
        return(
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Leaderboards</h1>
                </header>
                <h2>Select Genre</h2>
                <select className ="btn btn-primary" onChange = {this.showTable}>
                    <option value = "0"selected="selected">Select Genre</option>
                {this.state.genres.map(function(item, key) {
                    return (
                    <option key ={key} value = {item.genre}>{item.genre}</option>
                 )
                }.bind(this))}
                </select>
                <br/>
                <br/>
                <button onClick = {(e) => this.sortTable(e)}>Sort</button>
                <div className="container">
                <table>
                    <thead className="bg-primary">
                    <tr>
                    <th>Rank</th>
                    <th>Username</th>
                    <th>Total Points</th>
                    </tr>    
                    </thead>
                    <tbody>
                    {this.state.tables.map(function(item,key)
                    {
                        return(
                            <tr key={key}>
                                <th>{key+1}</th>
                                <th>{item.username}</th>
                                <th>{item.total}</th>
                            </tr>
                        )
                    })}
                    
                    </tbody>
                </table>
        
                </div>


            </div>
        )
    }
}

export default Leaderboard;