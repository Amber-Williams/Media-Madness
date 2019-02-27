import React, { Component } from 'react';
import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


export default class User extends Component {

  saySomething(event){
    let message = document.getElementById('m').value;
    event.preventDefault()
    this.props.emitMessage( message);
    message = '';
  }

  render() {
    return (
      <div>
        <h1>user is here</h1>
        <form action="">
          <input id="m" autocomplete="off" />
          <button onClick={this.saySomething.bind(this)}>test</button>
        </form>

      </div>
    )
  }
}
