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
      methods,
      question: '',
      users: [],
      startGame: false,
      showSubmitted: false
    }

    socket.on('chat message content', (user, msg) => {
      this.setState({
        messages: [...this.state.messages, {username: user, message: msg}]
      });
    })
  
    socket.on('global users', (question, users) => {
      this.setState({
        question,
        users
      });
    })
    
    socket.on('personal login user', (id, user) => {
      this.setState({
        username: user
      });
      localStorage.setItem('socketId', id) //will need to store these into per game room in a database table so person can rejoin room on disconnection
    })

    socket.on('game started', () => {
      this.setState({
        startGame: true
      })
    })

    socket.on('submitted a round', () => {
      this.setState({
        showSubmitted: true
      })
    })
  }
  
  startGameFunc = () => {
    socket.emit('start game');
  }

  showSubmittedFunc = () => {
    socket.emit('submitted round')
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
          Hello: {this.state.username}
          <br/>
          <br/>
          <br/>
            <Link to='/central'>Central </Link>
            <Link to='/user'>User</Link>
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} 
                messages={this.state.messages}
                question={this.state.question}
                users={this.state.users}
                startGameFunc={this.startGameFunc}
                startGame={this.state.startGame}
                showSubmittedFunc={this.showSubmittedFunc}
                showSubmitted={this.state.showSubmitted}
                /> }
              />
            <Route 
              path={'/user'}
              render={ (props) => <User {...props} 
                emitMessage={this.emitMessage}
                question={this.state.question}
                startGame={this.state.startGame}
                showSubmitted={this.state.showSubmitted}
                messages={this.state.messages}
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
            <Link to='/user'>Login</Link>
            <Route 
              path='/user'
              render={ (props) => <Login {...props} emitUser={this.emitUser} user={this.state.username} /> }
              />
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} messages={this.state.messages} user={this.state.username} users={this.state.users}/> }
              />
          </div>
        </Router>
      )
    }
  }
}

export default App;
