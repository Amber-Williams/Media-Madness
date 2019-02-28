import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

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

  render() {

    return (
      <Router>
        <div>
          <Link to='/central'>Central </Link>
          <Link to='/user'>User</Link>

          <Route 
            path={'/central'}
            render={ (props) => <Central {...props} messages={this.state.messages}/> }
            />


          <Route 
            path={'/user'}
            render={ (props) => <User {...props} emitMessage={this.emitMessage}/> }
            />
        </div>
      </Router>
    );
  }
}

export default App;
