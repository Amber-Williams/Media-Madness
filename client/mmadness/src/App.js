import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';
import Login from './login/login';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');

class App extends Component {
  constructor (){
    super()
    this.state = {
      messages: [],
      username: ''
    }

    socket.on('chat message content', (msg) => {
      this.setState({
        messages: [...this.state.messages, msg]
      });
    })

    socket.on('login user', (user, socketId) =>{
      this.setState({
        username: user
      });
      
      localStorage.setItem('socketId', socketId) //will need to store these into per game room in a database table so person can rejoin room on disconnection
    })
  }

  emitMessage = (msg) => {
    socket.emit('chat message', msg);
  }

  emitUser = (user) => {
    socket.emit('login', user);
  }

  render() {
    if(this.state.username === ''){
      return (
        <Router>
          <div>
            <Login emitUser={this.emitUser} />
  
            <Link to='/central'>Central </Link>
  
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} messages={this.state.messages} user={this.state.username}/> }
              />
          </div>
        </Router>
      );
    } 
    
    else {
      return (
        <Router>
          <div>
            <Link to='/central'>Central </Link>
            <Link to='/user'>User</Link>

            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} messages={this.state.messages} user={this.state.username}/> }
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

}

export default App;
