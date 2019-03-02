import React, { Component } from 'react';
import './central.css';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

export default class Central extends Component {
   
  render() {
    const message = this.props.messages
      .map((message, key) => 
        <li key={message.id}> 
          <h4>{this.props.user}</h4>
          <img src={message.images.fixed_height.url}/> 
        </li>
      )
      
    let users = (<h3>no one is here</h3>); //how to get to show whos in on everyone's central screen in live update...not nessesary ATM
    if (this.props.users.length > 0) {
      users = this.props.users
        .map((user,key) => 
        <li key={key}> 
          <h3>{user.username}</h3>
        </li>
        )
    }

    return (
      <div className="centralApp">
        <h1> central is here</h1>
        {this.props.question}
        {message}
        <ul>
          {users}
        </ul>
        
      </div>
    )
  }
}

// whos joined screen with start button
// start screen with round question & players who have submitted


