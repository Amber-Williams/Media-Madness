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
      showSubmitted: false,
      showScores: false,
      votes: []
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
      console.log('showSubmitted Round socket', this.state.showSubmitted)
      
    })

    socket.on('show votes', (votes) => {
      this.setState({
        showScores: true,
        votes
      })
    })
  }
  
  startGameFunc = () => {
    socket.emit('start game');
  }

  showSubmittedFunc = () => {
    socket.emit('submitted round');
    console.log('showSubmittedFunc')
    this.setState({
      showSubmitted: true
    })
  }

  emitMessage = (msg) => {
    socket.emit('chat message', this.state.username, msg);
  }

  emitUser = (user) => {
    socket.emit('login', user);
  }

  voteMessage = (user, msg, voter) => {
    socket.emit('user voted', user, msg, voter)
  }

  render() {
    if (this.state.username !== ''){
      return (
        <Router>
          <div>
            Hello: {this.state.username}
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
                showScores={this.state.showScores}
                votes={this.state.votes}
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
                vote={this.voteMessage}
                username={this.state.username}
                showScores={this.state.showScores}
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
              render={ (props) => <Central {...props} 
                messages={this.state.messages}
                question={this.state.question}
                users={this.state.users}
                startGameFunc={this.startGameFunc}
                startGame={this.state.startGame}
                showSubmittedFunc={this.showSubmittedFunc}
                showSubmitted={this.state.showSubmitted}
                showScores={this.state.showScores}
                votes={this.state.votes}
              /> }
              />
          </div>
        </Router>
      )
    }
  }
}

export default App;
