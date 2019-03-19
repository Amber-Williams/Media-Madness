import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';
import Login from './login/login';
import { Markup } from 'interweave';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import methods from './helpers/helperFuncs';

import openSocket from 'socket.io-client';
const socket = openSocket('http://192.168.1.232:3000/');

class App extends Component {
  constructor (){
    super()
    this.state = {
      roomCode: '',
      messages: [],
      username: '',
      methods,
      question: '',
      users: [],
      votes: [],
      userStage: 1,
      centralStage: 1,
      currentRound: 0,
      error: ''
    }

    socket.on('game room code', (roomCode) =>{
      this.setState({
        roomCode
      });
    })

    socket.on('personal login user', (id, username) => {
      this.setState({
        username
      });
      localStorage.setItem('socketId', id) //will need to store these into per game room in a database table so person can rejoin room on disconnection
    })

  
    socket.on('global users', (users, roomCode) => {
      this.setState({
        users,
        roomCode
      });
    })

    socket.on('game started', (question) => {
      this.setState({
        question: <Markup content={question} />,
        userStage:2,
        centralStage: 2,
        currentRound: this.state.currentRound + 1
      })
      //need to make log in user disabled on game start to avoid users joining in middle of game
    })

    socket.on('chat message content', (username, message, round) => {
      this.setState({
        messages: [...this.state.messages, {username, message, round}]
      });
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
    socket.on('room code does not exist', () => {
      this.setState({
        error: 'Room code does not exist'
      })
    })

  }
  
  startGameFunc = () => {
    socket.emit('start game', this.state.roomCode);
  }

  emitMessage = (msg) => {
    socket.emit('chat message', this.state.username, msg, this.state.roomCode);
    this.setState({
      userStage: 3
    })
  }

  emitUser = (user, roomCode) => {
    let checkIfUserExists = this.state.users.filter(name=> {return name.username === user});
    console.log("users", this.state.users) //THIS IS NOT WORKING ANY LONGER ... STATE WON"T CHANGE
    if(checkIfUserExists.length === 0){
      socket.emit('login', user, roomCode);
    } else {
      alert('User already exists')
    }
  }

  voteMessage = (user, msg, voter) => {
    socket.emit('user voted', user, msg, voter, this.state.currentRound, this.state.roomCode);
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
                error={this.state.error}
                /> }
              />
            <Route 
              path={'/central'}
              render={ (props) => <Central {...props} 
                roomCode={this.state.roomCode}
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
