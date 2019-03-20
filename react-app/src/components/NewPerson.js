import React, { Component } from 'react';
import './NewPerson.css';

/* This code is for making a new person */
/* The given fucntion is for validating form such as password checking ,etc  */
export const FormErrors = ({ formErrors }) =>
  <div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if (formErrors[fieldName].length > 0) {
        return (
          <p key={i}>{fieldName} {formErrors[fieldName]}</p>
        )
      } else {
        return '';
      }
    })}
  </div>

/* This is the main component */
class NewPerson extends Component {
  constructor() {
    super();
    this.state = {
      username: "",
      password: "",
      email: "",
      formErrors: {
        username: "",
        email: "",
        password: ""
      },
      usernameValid: false,
      emailValid: false,
      passwordValid: false,
      correct: false,
      submitted: false,
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* This will check for submission. It will send a post request, based on response print message */
  handleSubmit(event) {
    event.preventDefault();
    let formData = { password: this.state.password, username: this.state.username, email: this.state.email }

    fetch('http://localhost:8080/people', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
      .then(response => {
        console.log(response.status)
        if (response.status === 400) {
          this.setState({ correct: true });
          console.log(this.state.correct);
        }
        else {
          this.setState({ submitted: true });
          console.log('Hello');
        }
      });
  }
  /* The given set of functions will be used for validating user inputs */
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }
  validateField(fieldName, value) {
    let fieldValError = this.state.formErrors;
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;

    switch (fieldName) {
      case 'username':
        usernameValid = value.length > 0;
        fieldValError.username = usernameValid ? '' : ' enter a valid username';
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValError.email = emailValid ? '' : ' enter a valid email address';
        break;
      case 'password':
        /* Password must have 1 lowercase character, 1 number and length >6 */
        passwordValid = value.match(/^(?=.*[a-z])+(?=.*[0-9])+(?=.*[!@#\$%\^&\*])+(?=.{6,})/);
        fieldValError.password = passwordValid ? '' : '  must have 1 lowercase character, 1 number and length >6'
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValError,
      emailValid: emailValid,
      usernameValid: usernameValid,
      passwordValid: passwordValid
    }, this.validateForm);

  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.passwordValid && this.state.usernameValid });
  }
  /* The main piece of code */
  render() {

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Sign-Up</h1>
        </header>
        <br /><br />
        <div className="panel panel-default red">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className="formContainer container">
          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" required className="form-control" name="username"
                placeholder="Username"
                value={this.state.username}
                onChange={this.handleUserInput} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={this.state.password}
                onChange={this.handleUserInput} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={this.state.email}
                onChange={this.handleUserInput} />
            </div>
            <button type="submit" className="btn btn-success">Register</button>
          </form>
        </div>

        {this.state.submitted &&
          <div>
            <h3 className="text-primary">Registered Succesfully</h3>
          </div>
        }
        {this.state.correct &&
          <div>
            <h3 className="text-danger">Username exists already</h3>
          </div>
        }

      </div>
    );
  }
}

export default NewPerson;
