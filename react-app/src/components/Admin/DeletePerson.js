import React, { Component } from 'react';

class DeletePerson extends Component {
  constructor() {
    super();
    this.state = {
      data: []
    }
  }
  /* We list out all the members here */
  componentDidMount() {
    const request = new Request('http://127.0.0.1:8080/people/');
    /* This works as a promise. We make an api call and the results 
    that we get are accordingly parsed as per resolution */
    fetch(request).then(response => response.json())
      .then(data => this.setState({ data: data }));
  }
  /* At the end of given operation we would have all the data present*/


  /* This function handles every delete operation. Basically 
  we check for each id through state.data.map and if its checked we delete it*/
  handleSubmit(event) {
    this.state.data.map(function (item, key) {
      if (document.getElementById(item.id).checked) {
        const request = new Request('http://127.0.0.1:8080/people/' + item.id)

        fetch(request, {
          method: 'DELETE'
        }).then(response => response.json());
      }
    });
    /* This will reload the page as and when required */
    setTimeout(function () {
      window.location.reload()
    }, 100);
  }


  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Delete a Person</h1>
        </header>
        <table className="table-hover">
          <thead>
            <tr>
              <th>Select</th>
              <th>ID</th>
              <th>Username</th>
              <th>Email </th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map(function (item, key) {
              return (
                <tr key={key}>
                  <td><input type="radio" id={item.id} /></td>
                  <td>{item.id}</td>
                  <td>{item.username}</td>
                  <td>{item.email}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <br />
        <br />
        <button className="btn btn-danger" type="submit" onClick={(e) => this.handleSubmit(e)}>Submit </button>
        <br />
        <br />
      </div>
    );
  }
}

export default DeletePerson;
