import React, { Component } from 'react';

export default class Login extends Component {

  
  userLogged(event){
    event.preventDefault();
    let username = document.getElementById('userIs').value;
    this.props.emitUser(username);
    this.props.history.push('/user')
  }

  render() {
    return (
      <div>
        <h1 onClick={this.onLogin}>Must log in:</h1>

        <form action="">
          <input id="userIs" autoComplete="off" />
          <button onClick={this.userLogged.bind(this)}>Submit</button>
        </form>

        <br/>
      </div>
    )
  }
}
