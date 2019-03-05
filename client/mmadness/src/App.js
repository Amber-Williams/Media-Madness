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
      votes: [],
      userStage: 1,
      centralStage: 1,
      currentRound: 0
    }

    socket.on('chat message content', (username, message, round) => {
      this.setState({
        messages: [...this.state.messages, {username, message, round}]
      });
    })
  
    socket.on('global users', (users) => {
      this.setState({
        users
      });
    })
    
    socket.on('personal login user', (id, user) => {
      this.setState({
        username: user
      });
      localStorage.setItem('socketId', id) //will need to store these into per game room in a database table so person can rejoin room on disconnection
    })

    socket.on('game started', (question) => {
      this.setState({
        question,
        userStage:2,
        centralStage: 2,
        currentRound: this.state.currentRound + 1
      })
    })

    socket.on('submitted a round', () => {
      this.setState({
        userStage: 4,
        centralStage: 3
      })
    })

    socket.on('show votes', (votes) => {
      this.setState({
        votes,
        userStage: 6,
        centralStage: 4
      })
    })

  }
  
  startGameFunc = () => {
    socket.emit('start game');
  }

  emitMessage = (msg) => {
    socket.emit('chat message', this.state.username, msg);
    this.setState({
      userStage: 3
    })
  }

  emitUser = (user) => {
    socket.emit('login', user);
  }

  voteMessage = (user, msg, voter) => {
    socket.emit('user voted', user, msg, voter);
    this.setState({
      userStage: 5
    })
  }

  render() {
    if (this.state.username !== ''){
      return (
        <Router>
          <div>
            <Route 
              path={'/user'}
              render={ (props) => <User {...props} 
                userStage={this.state.userStage}
                emitMessage={this.emitMessage}
                question={this.state.question}
                messages={this.state.messages}
                vote={this.voteMessage}
                username={this.state.username}
                startGameFunc={this.startGameFunc}
                currentRound={this.state.currentRound}
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
            <Route 
              path='/user'
              render={ (props) => <Login {...props} 
                emitUser={this.emitUser} 
                user={this.state.username} 
                /> }
              />
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} 
                messages={this.state.messages}
                question={this.state.question}
                users={this.state.users}
                startGameFunc={this.startGameFunc}
                votes={this.state.votes}
                centralStage={this.state.centralStage}
                currentRound={this.state.currentRound}
                /> }
              />
          </div>
        </Router>
      )
    }

  }
}

export default App;
