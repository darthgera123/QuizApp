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
      formValid: false
    }
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  /* This will check for submission. It will send a post request, based on response print message */
  handleSubmit(event) {
    event.preventDefault();

    if(this.state.formValid) {
      let formData = { password: this.state.password, username: this.state.username, email: this.state.email }

      fetch('http://localhost:8080/people', {
        method: 'POST',
        body: JSON.stringify(formData),
      })
        .then(response => {
          console.log(response.status)
          if (response.status === 400) {
            this.setState({ correct: true, submitted: false });
            console.log(this.state.correct);
          }
          else {
            this.setState({ submitted: true, correct: false });
            console.log('Hello');
          }
        });
    }
    
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
      case 'password':
        /* Password must have 1 lowercase character, 1 number and length >6 */
        passwordValid = value.match(/^(?=.*[a-z])+(?=.*[0-9])+(?=.*[!@#\$%\^&\*])+(?=.{6,})/);
        fieldValError.password = passwordValid ? '' : '  must have 1 symbol, 1 lowercase character, 1 number and length >6'
        break;
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValError.email = emailValid ? '' : ' enter a valid email address';
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
    console.log(this.state.formValid)
  }
  /* The main piece of code */
  render() {

    const { formErrors, submitted, correct, username, password, email } = this.state;

    return (
      <div className="App">
        <div className="formContainer container">
          <h1>Sign Up</h1>
          
          {(formErrors.username !== '' || formErrors.password !== '' || formErrors.email !== '') &&
            <FormErrors formErrors={formErrors} />}

          {submitted &&
              <div className="success">Registered Succesfully</div>}

          {correct &&
            <div className="error">Username exists already</div> }

          <form onSubmit={this.handleSubmit}>
            <div className="form-group">
              <label>Username</label>
              <input type="text" required className="form-control" name="username"
                placeholder="Username"
                value={username}
                onChange={this.handleUserInput} />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input type="password" className="form-control" name="password"
                placeholder="Password"
                value={password}
                onChange={this.handleUserInput} />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input type="email" required className="form-control" name="email"
                placeholder="Email"
                value={email}
                onChange={this.handleUserInput} />
            </div>
            <button type="submit" className="btn btn-primary">Register</button>
          </form>
        </div>

      </div>
    );
  }
}

export default NewPerson;
