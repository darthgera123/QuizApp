import React, { Component } from 'react';

/* This is the edit question code. In this you basically populate the original querries and make an appropiate request */
class EditQuestion extends Component {
    constructor() {
        super();
        this.state = {
            genres: [],
            qnames: [],
            quiz: [],
            answers: [],
            formData: {
                genre: "",
                qname: "",
                question: "",
                optionA: "",
                optionB: "",
                optionC: "",
                optionD: "",
                image: "",
                answerA: false,
                answerB: false,
                answerC: false,
                answerD: false,
            },
            questionModify: [],
            quizShow: "",
            quizSelected: false,
            showQuestion: false,
            showMenu: true,
            ShowOptions: false,
            submitted: false,

        }
        this.handleQuChange = this.handleQuChange.bind(this);
        this.SelectGenre = this.SelectGenre.bind(this);
        this.SelectQuiz = this.SelectQuiz.bind(this);
        this.SelectQuestion = this.SelectQuestion.bind(this);
        this.ShowQuiz = this.ShowQuiz.bind(this);
        this.SelectOptions = this.SelectOptions.bind(this);

        this.handleOaChange = this.handleOaChange.bind(this);
        this.handleObChange = this.handleObChange.bind(this);
        this.handleOcChange = this.handleOcChange.bind(this);
        this.handleOdChange = this.handleOdChange.bind(this);
        this.handleAaChange = this.handleAaChange.bind(this);
        this.handleAbChange = this.handleAbChange.bind(this);
        this.handleAcChange = this.handleAcChange.bind(this);
        this.handleAdChange = this.handleAdChange.bind(this);
        this.handleImageChange = this.handleImageChange.bind(this);
        this.handleNewImage = this.handleNewImage.bind(this);
    }

    // Lifecycle hook, runs after component has mounted onto the DOM structure
    componentDidMount() {
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
        }
        else {
            this.setState({ qnames: [] });
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
            this.state.formData = this.state.questionModify;
        }
    }

    SelectQuestion(event) {
        var quiz = this.state.quizShow
        var q = event.target.value;
        if (q != "0") {
            fetch('http://127.0.0.1:8080/quiz/' + quiz + '/' + q)
                .then(response => response.json())
                .then(questionModify => this.setState({ questionModify: questionModify }))
        }
    }

    SelectOptions(event) {
        event.preventDefault()
        this.setState({ showMenu: true, quizSelected: false, quizShow: "", quiz: [] });
        let quiz = this.state.formData.qname;
        let ques = this.state.formData.question;
        fetch('http://localhost:8080/quiz/' + quiz + '/' + ques, {
            method: 'PUT',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300)
                    this.setState({ submitted: true });
            });
    }
    handleQuChange(event) {
        this.state.formData.question = event.target.value;
    }
    handleOaChange(event) {
        this.state.formData.optionA = event.target.value;
    }
    handleObChange(event) {
        this.state.formData.optionB = event.target.value;
    }
    handleOcChange(event) {
        this.state.formData.optionC = event.target.value;
    }
    handleOdChange(event) {
        this.state.formData.optionD = event.target.value;
    }
    handleAaChange(event) {
        if (document.getElementById("ansA").checked) {
            this.state.formData.answerA = true;
        }

        else {
            this.state.formData.answerA = false;
        }
        console.log(this.state.formData.answerA);
    }
    handleAbChange(event) {
        if (document.getElementById("ansB").checked) {
            this.state.formData.answerB = true;
        }

        else {
            this.state.formData.answerB = false;
        }
        console.log(this.state.formData.answerB);

    } handleAcChange(event) {
        if (document.getElementById("ansC").checked) {
            this.state.formData.answerC = true;
        }

        else {
            this.state.formData.answerC = false;
        }
        console.log(this.state.formData.answerC);

    } handleAdChange(event) {
        if (document.getElementById("ansD").checked) {
            this.state.formData.answerD = true;
        }

        else {
            this.state.formData.answerD = false;
        }
        console.log(this.state.formData.answerD);
    }
    handleImageChange(event) {
        if (document.getElementById("image").checked) {
            this.setState({ isImage: true });
        }

        else {
            this.setState({ isImage: false });
        }
    }
    handleNewImage(event) {
        this.state.formData.image = event.target.value;
    }


    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Edit Question</h1>
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
                        <h2>Select Question</h2>
                        <select className="btn btn-warning" onChange={this.SelectQuestion}>
                            <option value="0" selected="selected">Select Question</option>
                            {this.state.quiz.map(function (item, key) {
                                return (
                                    <option value={item.question}>{item.question}</option>
                                )
                            }.bind(this))
                            }



                        </select>
                        <br />
                        <h2>Update Quiz?</h2>
                        <button className="btn btn-success" onClick={this.ShowQuiz}>Start Quiz</button>
                    </div>
                }
                {this.state.quizSelected &&
                    <h1>{this.state.quizShow}</h1>}
                <br />
                <br />
                {this.state.quizSelected &&
                    <div>
                        <div className="formContainer">
                            <form >
                                <div className="form-group">
                                    <div className="row">

                                        <div className="col-md-6">
                                            <h3><label>Question</label></h3>
                                            <input type="text" id="question" placeholder={this.state.questionModify.question} className="form-control" value={this.state.question} onChange={this.handleQuChange} />
                                        </div>
                                        <div className="col-md-6">
                                            <h3><label>Image Url (optional)</label></h3>
                                            <br />
                                            <input type="text" id="image" placeholder={this.state.questionModify.image} className="form-control" value={this.state.image} onChange={this.handleQuChange} />
                                            {this.state.questionModify.image &&
                                                <img src={this.state.questionModify.image} alt={this.state.questionModify.question} />
                                            }
                                        </div>
                                    </div>
                                </div>


                                <div className="form-group">
                                    <div className="row">
                                        <div className="col-md-3">
                                            <h4><label>Option A</label></h4>
                                            <input type="text" id="optionA" placeholder={this.state.questionModify.optionA} className="form-control" value={this.state.optionA} onChange={this.handleOaChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <h4><label>Option B</label></h4>
                                            <input type="text" id="optionB" placeholder={this.state.questionModify.optionB} className="form-control" value={this.state.optionB} onChange={this.handleObChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <h4><label>Option C</label></h4>
                                            <input type="text" id="optionC" placeholder={this.state.questionModify.optionC} className="form-control" value={this.state.optionC} onChange={this.handleOcChange} />
                                        </div>
                                        <div className="col-md-3">
                                            <h4><label>Option D</label></h4>
                                            <input type="text" id="optionD" placeholder={this.state.questionModify.optionD} className="form-control" value={this.state.optionD} onChange={this.handleOdChange} />
                                        </div>
                                    </div>
                                </div>



                                <div className="form-group">
                                    <label>Answer A</label>
                                    &nbsp;&nbsp;
        {(() => {
                                        if (this.state.questionModify.answerA) {
                                            return (<input type="checkbox" id="ansA" checked disabled />);
                                        }
                                        else {
                                            return (<input type="checkbox" id="ansA" disabled />);
                                        }
                                    })()}
                                    <label>Answer B</label>
                                    &nbsp;&nbsp;
        {(() => {
                                        if (this.state.questionModify.answerB) {
                                            return (<input type="checkbox" id="ansB" checked disabled />);
                                        }
                                        else {
                                            return (<input type="checkbox" id="ansB" disabled />);
                                        }
                                    })()}
                                    <label>Answer C</label>
                                    &nbsp;&nbsp;
        {(() => {
                                        if (this.state.questionModify.answerC) {
                                            return (<input type="checkbox" id="ansC" disabled />);
                                        }
                                        else {
                                            return (<input type="checkbox" id="ansC" disabled />);
                                        }
                                    })()}
                                    <label>Answer D</label>
                                    &nbsp;&nbsp;
        {(() => {
                                        if (this.state.questionModify.answerD) {
                                            return (<input type="checkbox" id="ansD" checked disabled />);
                                        }
                                        else {
                                            return (<input type="checkbox" id="ansD" disabled />);
                                        }
                                    })()}
                                </div>
                                <div className="form-group">
                                    <h3>New answers</h3>
                                    <label>Answer A</label>
                                    &nbsp;&nbsp;
        <input type="checkbox" id="ansA" value={this.state.answerA} onChange={this.handleAaChange} />
                                    <label>Answer B</label>
                                    &nbsp;&nbsp;
        <input type="checkbox" id="ansB" value={this.state.answerB} onChange={this.handleAbChange} />
                                    <label>Answer C</label>
                                    &nbsp;&nbsp;
        <input type="checkbox" id="ansC" value={this.state.answerC} onChange={this.handleAcChange} />
                                    <label>Answer D</label>
                                    &nbsp;&nbsp;
        <input type="checkbox" id="ansD" value={this.state.answerD} onChange={this.handleAdChange} />
                                </div>
                                <button type="submit" id="submit" className="btn btn-success" onClick={(e) => this.SelectOptions(e)}>Submit</button>
                                <br />
                                <br />
                            </form>
                        </div>


                    </div>
                }
                {this.state.submitted &&
                    <h2>Options/Answers updated successfully</h2>
                }

            </div>
        );
    }


}
export default EditQuestion;