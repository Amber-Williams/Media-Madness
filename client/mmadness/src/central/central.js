import React, { Component } from 'react';
import './central.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

export default class Central extends Component {
  state = {
    startGame: false,
    showSubmitted: false,
  } 

  startGame = () => {
    this.setState({
      startGame: true,
      showSubmitted: false
    })
  }

  showSubmitted = () => {
    this.setState({
      startGame: false,
      showSubmitted: true
    })
  }

  render() {
    const message = this.props.messages
      .map((message, key) => 
        <li key={key}> 
          <h4>{message.username}</h4>
          <img src={message.message.images.fixed_height.url}/> 
        </li>
      )

    let users = (<h3>no one is here</h3>);
    if (this.props.users.length > 0) {
      users = this.props.users
        .map((user,key) => 
        <li key={key}> 
          <h3>{user.username}</h3>
        </li>
        )
    }
    // start screen with round question & players who have submitted // with next button
    if (this.state.startGame === true && this.props.users.length > 0) {
      return (
        <div className="centralApp">
          <h1> 2. central is here </h1>
          {this.props.question}
          <br/>
          <ul>
            {users}
          </ul>
          <button onClick={this.showSubmitted}>Show Submitted</button>
        </div>
      )
    } 
    // show submitted answers
    else if (this.state.showSubmitted === true ) {
      return (
        <div className="centralApp">
          <h1> 3. central is here </h1>
          {this.props.question}
          {message}
          <br/>
          <ul>
            {users}
          </ul>
        </div>
      )
    }
    // whos joined screen with start button
    else {
      return (
        <div className="centralApp">
          <h1> 1. central is here</h1>
          <ul>
            {users}
          </ul>
          <button onClick={this.startGame}>Start Game</button>
        </div>
      )
    }
  }
}

//Break up screens into routes?






