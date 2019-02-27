import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class App extends Component {
  constructor (){
    super()
    this.state = {
      messages: []
    }

    socket.on('chat message content', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    })

  }

  emitMessage = (msg) => {
    socket.emit('chat message', msg);
  }

  // $('form').submit(function(event){
  //   event.preventDefault(); // prevents page reloading
  //   socket.emit('chat message', $('#m').val());
  //   $('#m').val('');

  render() {

    return (
        <div>
          App.js works
          <User emitMessage={this.emitMessage}/>
          <Central messages={this.state.messages}/>
        </div>
    );
  }
}

export default App;

//  need to figure out port thing /////////
// react -> on user app button push -> emit "user message" with value
// server -> on "user message" -> emit "user message"
// react -> central on "user message" -> append "user message" with sent value