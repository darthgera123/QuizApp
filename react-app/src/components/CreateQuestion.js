import React, { Component } from 'react';
class CreateQuestion extends Component {
    constructor() {
        super();
        this.state = {
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
            submitted: false,
            isImage: false,
        }
        this.handleGChange = this.handleGChange.bind(this);
        this.handleQnChange = this.handleQnChange.bind(this);
        this.handleQuChange = this.handleQuChange.bind(this);
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
        this.NewQuestion = this.NewQuestion.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    /* Thing to do verify non entry of duplicate entry */
    handleSubmit(event) {
        event.preventDefault();
        fetch('http://localhost:8080/quiz/', {
            method: 'POST',
            body: JSON.stringify(this.state.formData),
        })
            .then(response => {
                if (response.status >= 200 && response.status < 300)
                    this.setState({ submitted: true });
            });
    }

    handleGChange(event) {
        this.state.formData.genre = event.target.value;
    }
    handleQnChange(event) {
        this.state.formData.qname = event.target.value;
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
    NewQuestion(event) {
        event.preventDefault();
        document.getElementById("question").value = "";
        document.getElementById("optionA").value = "";
        document.getElementById("optionB").value = "";
        document.getElementById("optionC").value = "";
        document.getElementById("optionD").value = "";
        document.getElementById("ansA").checked = false;
        document.getElementById("ansB").checked = false;
        document.getElementById("ansC").checked = false;
        document.getElementById("ansD").checked = false;
    }

    NewQuiz(event) {
        event.preventDefault();
        document.getElementById("qname").value = "";
        document.getElementById("question").value = "";
        document.getElementById("optionA").value = "";
        document.getElementById("optionB").value = "";
        document.getElementById("optionC").value = "";
        document.getElementById("optionD").value = "";
        document.getElementById("ansA").checked = false;
        document.getElementById("ansB").checked = false;
        document.getElementById("ansC").checked = false;
        document.getElementById("ansD").checked = false;
    }
    render() {

        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Add Quiz</h1>
                </header>
                <br /><br />
                <div className="formContainer">
                    <form >
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Genre</label>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" className="form-control" value={this.state.genre} onChange={this.handleGChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Quiz Name</label>
                                </div>
                                <div className="col-md-6">
                                    <input type="text" id="qname" className="form-control" value={this.state.qname} onChange={this.handleQnChange} />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="form-group">
                                <div className="col-md-6">
                                    <label>Question</label>
                                    <input type="text" id="question" className="form-control" value={this.state.question} onChange={this.handleQuChange} />
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Image</label>
                                    <input type="checkbox" id="image" className="form-control" value={this.state.isImage} onChange={this.handleImageChange} />
                                </div>
                            </div>
                        </div>
                        {this.state.isImage &&
                            <div className="form-group">
                                <div className="row">
                                    <div className="col-md-6">
                                        <label>Image Url</label>
                                    </div>
                                    <div className="col-md-6">
                                        <input type="text" id="imageQ" className="form-control" value={this.state.image} onChange={this.handleNewImage} />
                                    </div>
                                </div>
                            </div>
                        }
                        <div className="row">
                            <div className="form-group">

                                <div className="col-md-3">
                                    <label>Option A</label>
                                    <input type="text" id="optionA" className="form-control" value={this.state.optionA} onChange={this.handleOaChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Option B</label>
                                    <input type="text" id="optionB" className="form-control" value={this.state.optionB} onChange={this.handleObChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Option C</label>
                                    <input type="text" id="optionC" className="form-control" value={this.state.optionC} onChange={this.handleOcChange} />
                                </div>
                                <div className="col-md-3">
                                    <label>Option D</label>
                                    <input type="text" id="optionD" className="form-control" value={this.state.optionD} onChange={this.handleOdChange} />
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
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

                        <button type="submit" id="submit" className="btn btn-success" onClick={(e) => this.handleSubmit(e)}>Submit</button>
                        <br />
                        <br />
                        <button className="btn btn-primary" onClick={e => this.NewQuestion(e)}>Create New Question</button>
                        &nbsp; &nbsp;
        <button className="btn btn-danger" onClick={e => this.NewQuiz(e)} >Create New Quiz</button>
                    </form>
                </div>

                {this.state.submitted &&
                    <div>
                        <h2>
                            Question added
            </h2>
                    </div>
                }

            </div>
        );
    }
}

export default CreateQuestion;
