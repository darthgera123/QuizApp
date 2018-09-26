import React, { Component } from 'react';
import './ViewPeople.css';
/* This is a view quiz component in which we also have added delete questions functionality */
class ViewQuestions extends Component {
  constructor() {
    super();
    this.state = {
      data: [],
      questions :[],
      showQuestion :false,
    }
    this.showQuestions = this.showQuestions.bind(this);
    this.deleteQuestions = this.deleteQuestions.bind(this);

  }

  // Lifecycle hook, runs after component has mounted onto the DOM structure
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/genres/');
    fetch(request)
      .then(response => response.json())
        .then(data => this.setState({data: data}));
  }

  showQuestions(item){
      console.log(item.qname);
      fetch('http://localhost:8080/quiz/'+item.qname)
      .then(response =>response.json())
      .then(questions=> this.setState({questions:questions}))
      .then(this.setState({showQuestion:true}))
  }
  deleteQuestions(item){
    console.log(item.question);
    let g = item.genre;
    let qn = item.qname;
    let ques = item.question;
    fetch('http://localhost:8080/quiz/'+g+'/'+qn+'/'+ques,{
      method:'DELETE',
    }).then(response=>response.json())
    setTimeout(function(){
      window.location.reload()
    },100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">All Questions</h1>
        </header>
        <div className="container">
        <table className="table-hover">
          <thead>
            <tr>
              <th>Genre</th>
              <th>Quiz Name</th>
            </tr>
          </thead>
          <tbody>{this.state.data.map(function(item, key) {
               return (
                  <tr key = {key}>
                      <td>{item.genre}</td>
                      <td>{item.qname}</td>
                      <td><button id ={item.qname} onClick = {() => this.showQuestions(item)}>Show Quiz</button></td>
                  </tr>
                )
             }.bind(this))}
          </tbody>
       </table>
       {this.state.showQuestion &&
        <table>
            <thead>
            <tr >
                <th>Question</th>
                <th>Image</th>
                <th>OptionA</th>
                <th>OptionB</th>
                <th>OptionC</th>
                <th>OptionD</th>
                <th>AnswerA</th>
                <th>AnswerB</th>
                <th>AnswerC</th>
                <th>AnswerD</th>
                <th>Delete</th>
            </tr>    
            </thead>
            <tbody>{
        this.state.questions.map(function(item, key) {
               return (
                  
                  <tr key = {key}>
                      <td>{item.question}</td>
                      {(() => {
                    if(item.image){
                    return (<td><img src={item.image} alt={item.question} className ="img-responsive"/></td>);
                    }
                    else{
                        return(<td>No image</td>);
                    }
                    })()}         

                      <td>{item.optionA}</td>
                      <td>{item.optionB}</td>
                      <td>{item.optionC}</td>
                      <td>{item.optionD}</td>
                      {(() => {
                    if(item.answerA){
                    return (<td>Yes</td>);
                    }
                    else{
                        return(<td>No</td>);
                    }
                    })()}
                    {(() => {
                    if(item.answerB){
                    return (<td>Yes</td>);
                    }
                    else{
                        return(<td>No</td>);
                    }
                    })()}
                    {(() => {
                    if(item.answerC){
                    return (<td>Yes</td>);
                    }
                    else{
                        return(<td>No</td>);
                    }
                    })()}
                    {(() => {
                    if(item.answerD){
                    return (<td>Yes</td>);
                    }
                    else{
                        return(<td>No</td>);
                    }
                    })()}
                    <td><button id ={item.qname} onClick = {() => this.deleteQuestions(item)}>Delete Question</button></td>         
                  </tr>
                  
                      
                )
             }.bind(this))
        }</tbody>
       </table>
       
       }
       </div>
      </div>
    );
  }
}

export default ViewQuestions;