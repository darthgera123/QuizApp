import React, { Component } from 'react';
import './ViewPeople.css';
/* Play quiz component */
class PlayQuiz extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            qnames: [],
            quiz: [],
            answers: [],
            quizShow: "",
            genreShow: "",
            quizSelected: false,
            showQuestion: false,
            score: 0,
            showScore: false,
            showMenu: true,
            ShowOptions: false,
            username: "",
            dummy: [],
            attemptedOnce: false,
        }
        this.SelectGenre = this.SelectGenre.bind(this);
        this.SelectQuiz = this.SelectQuiz.bind(this);
        this.ShowQuiz = this.ShowQuiz.bind(this);
        this.SelectOptions = this.SelectOptions.bind(this);
    }


    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
        this.state.username = JSON.parse(localStorage.getItem('user')).username;
        const request = new Request('http://127.0.0.1:8080/all-genres/');
        fetch(request)
            .then(response => response.json())
            .then(genres => this.setState({ genres: genres }));
    }

    SelectGenre(event) {
        let genre = event.target.value;
        if (genre != "0") {
            fetch('http://127.0.0.1:8080/genres/' + genre)
                .then(response => response.json())
                .then(qnames => this.setState({ qnames: qnames }))
            this.setState({ genreShow: genre });
        }
        else {
            this.setState({ qnames: [], genreShow: "" });
        }
    }
    SelectQuiz(event) {
        var quizy = event.target.value;
        if (quizy != "0") {
            fetch('http://127.0.0.1:8080/quiz/' + quizy)
                .then(response => response.json())
                .then(quiz => this.setState({ quiz: quiz, quizShow: quizy }))
        }
        else {
            this.setState({ quiz: [], quizShow: "" });
        }
    }

    ShowQuiz() {
        if (this.state.quizShow != "") {
            this.setState({ quizSelected: true, showMenu: false });
            let u = this.state.username;
            let g = this.state.genreShow;
            let qn = this.state.quizShow;
            console.log(u, g, qn);
            fetch('http://localhost:8080/score/' + u + '/' + g + '/' + qn)
                .then(response => {
                    response.json().then;

                    if (response.ok) {
                        this.setState({ attemptedOnce: true });
                        console.log("kar rakha hai");
                    }
                })

        }
    }

    SelectOptions() {
        var points = 0;
        this.state.quiz.map(function (item, key) {
            let optionASelect = document.getElementById(item.qid + item.optionA).checked;
            let optionBSelect = document.getElementById(item.qid + item.optionB).checked;
            let optionCSelect = document.getElementById(item.qid + item.optionC).checked;
            let optionDSelect = document.getElementById(item.qid + item.optionD).checked;
            let tentAns = optionASelect.toString() + optionBSelect.toString() + optionCSelect.toString() + optionDSelect.toString();
            let correctAns = item.answerA.toString() + item.answerB.toString() + item.answerC.toString() + item.answerD.toString();
            if (tentAns == correctAns)
                points += 1;
        })
        //this.state.score = points*10;
        this.setState({ score: points * 10, showScore: true, showMenu: true, quizSelected: false, quizShow: "", quiz: [] });
        let formData = { username: this.state.username, qname: this.state.quizShow, genre: this.state.genreShow, score: points * 10 }
        if (this.state.attemptedOnce) {
            fetch('http://localhost:8080/score/', {
                method: 'PUT',
                body: JSON.stringify(formData),
            })
        }


        else {
            fetch('http://localhost:8080/score/', {
                method: 'POST',
                body: JSON.stringify(formData),
            })
        }

    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Play Quiz {this.state.username}</h1>
                </header>
                {this.state.showMenu &&
                    <div>
                        <h2>Select Genre</h2>
                        <select className="btn btn-primary" onChange={this.SelectGenre}>
                            <option value="0" selected="selected">Select Genre</option>
                            {this.state.genres.map(function (item, key) {
                                return (
                                    <option value={item.genre}>{item.genre}</option>
                                )
                            }.bind(this))}

                        </select>
                        <br />
                        <h2>Select Quiz</h2>
                        <select className="btn btn-info" onChange={this.SelectQuiz}>
                            <option value="0" selected="selected">Select Quiz</option>
                            {this.state.qnames.map(function (item, key) {
                                return (
                                    <option value={item.qname}>{item.qname}</option>
                                )
                            }.bind(this))
                            }

                        </select>
                        <br />
                        <h2>Ready to Play?</h2>
                        <button className="btn btn-success" onClick={this.ShowQuiz}>Start Quiz</button>
                    </div>
                }
                {this.state.quizSelected &&
                    <h1>{this.state.quizShow}</h1>}
                <br />
                <br />
                {this.state.quizSelected &&
                    <div className="container">{
                        this.state.quiz.map(function (item, key) {
                            return (
                                <div className="row">
                                    <div className="col-md-6">
                                        <div key={key}>
                                            <h2>{item.question}</h2>
                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3>{item.optionA}</h3>
                                                </div>
                                                <div className="col-md-6">
                                                    <br />
                                                    <input type="checkbox" id={item.qid + item.optionA} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3>{item.optionB}</h3>
                                                </div>
                                                <div className="col-md-6">
                                                    <br />
                                                    <input type="checkbox" id={item.qid + item.optionB} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3>{item.optionC}</h3>
                                                </div>
                                                <div className="col-md-6">
                                                    <br />
                                                    <input type="checkbox" id={item.qid + item.optionC} />
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-md-6">
                                                    <h3>{item.optionD}</h3>
                                                </div>
                                                <div className="col-md-6">
                                                    <br />
                                                    <input type="checkbox" id={item.qid + item.optionD} />
                                                </div>
                                            </div>


                                        </div>
                                    </div>

                                    {(() => {
                                        if (item.image) {
                                            return (<div className="col-md-6">
                                                <img src={item.image} alt={item.question} className="img-fluid" />
                                            </div>);
                                        }
                                    })()}
                                </div>
                            )
                        }.bind(this))
                    }
                        {this.state.quizSelected &&
                            <div>
                                <button className="btn btn-success" onClick={this.SelectOptions}>Submit</button>
                                <br />
                                <br />
                                <br />
                            </div>
                        }


                    </div>
                }
                {this.state.showScore &&
                    <div>
                        <h2>Previous Game Score</h2>
                        <h3>{this.state.score}</h3>
                        <br />
                        <br />
                        <br />
                    </div>
                }

            </div>
        );
    }


}
export default PlayQuiz;