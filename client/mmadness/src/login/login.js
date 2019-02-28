import React, { Component } from 'react';

export default class Login extends Component {
  constructor() {
    super();
    //Set default message
    this.state = {
      message: 'Loading...'
    }
  }

  userLogged(event){
    event.preventDefault();
    let username = document.getElementById('userIs').value;
    this.props.emitUser(username);
  }

  async onLogin(){ // Delete this later
    await fetch('http://localhost:3000/api/user')
    .then(res => res.json())
    .then(res => console.log(res))
  }

  render() {
    return (
      <div>
        <h1 onClick={this.onLogin}>Must log in:</h1>

        <p>{this.state.message}</p>

        <form action="">
          <input id="userIs" autoComplete="off" />
          <button onClick={this.userLogged.bind(this)}>Submit</button>
        </form>

        <br/>
      </div>
    )
  }
}

// sendGif(selectedGif){
//   this.props.emitMessage(selectedGif);
// }