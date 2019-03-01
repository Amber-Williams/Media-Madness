import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';
import Login from './login/login';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import methods from './helpers/helperFuncs';


import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:3000');


class App extends Component {
  constructor (){
    super()
    this.state = {
      messages: [],
      username: '',
      methods
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
    socket.emit('chat message', this.state.username, msg);
  }

  emitUser = (user) => {
    socket.emit('login', user);
  }

  render() {
    if (this.state.username !== ''){
      return (
        <Router>
          <div>
            <Link to='/central'>Central </Link>
            <Link to='/user'>User</Link>
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} 
                messages={this.state.messages} 
                user={this.state.username}
                question={this.state.methods.generateQuestion().text}
                /> }
              />
            <Route 
              path={'/user'}
              render={ (props) => <User {...props} 
                emitMessage={this.emitMessage}
                question={this.state.methods.generateQuestion().text}
                /> }
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
            <Link to='/'>Login</Link>
            <Route 
              path='/'
              render={ (props) => <Login {...props} emitUser={this.emitUser} user={this.state.username} /> }
              />
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} messages={this.state.messages} user={this.state.username}/> }
              />
          </div>
        </Router>
      )
    }
  }
}

export default App;
