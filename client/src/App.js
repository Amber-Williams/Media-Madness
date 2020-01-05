import React, { Component } from 'react';
import './App.css';
import User from './user/user';
import Central from './central/central';
import Login from './login/login';
import { Markup } from 'interweave';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import socket from './socket/socket';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  changeScreenStages,
  addMessage,
  setGameRoundVotes,
  incGameRound
} from './redux/actions';

class App extends Component {
  constructor (){
    super()
    this.state = {
      roomCode: '',
      username: '',
      question: '',
      users: [],
      error: ''
    }
  }

  componentDidMount() {
    // can move these socket.on's once redux is implimented
    socket.on('game room code', (roomCode) => {
      this.setState({
        roomCode
      });
    })

    socket.on('personal login user', (username, socketID, roomID) => {
      this.setState({
        username
      });
      const userLogInfo = {username, socketID, roomID}
      localStorage.setItem('userLogInfo', JSON.stringify(userLogInfo) )
    })

    socket.on('remove localStorage userLogInfo', () => {
      localStorage.removeItem('userLogInfo')
    })

    socket.on('update localStorage userLogInfo', (userLogInfo) => {
      this.setState({
        username: userLogInfo.username,
        roomCode:  userLogInfo.roomID
      });
      localStorage.setItem('userLogInfo', JSON.stringify(userLogInfo))
    })

    socket.on('global users', (users, roomCode) => {
      this.setState({
        users,
        roomCode
      });
    })

    socket.on('game started', (question) => {
      this.props.changeScreenStages([2,2]);
      this.props.incGameRound();
      this.setState({
        question: <Markup content={question} />
      })
      //need to make log in user disabled on game start to avoid users joining in middle of game
    })

    socket.on('chat message content', (username, message, round) => {
      this.props.addMessage({username, message, round})
    })

    socket.on('submitted a round', () => {
      this.props.changeScreenStages([4, 3]);
    })

    socket.on('show votes', (votes) => {
      this.props.changeScreenStages([6, 4]);
      this.props.setGameRoundVotes(votes);
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
    this.props.changeScreenStages([3,2]);
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
    socket.emit('user voted', user, msg, voter, this.props.gameRound, this.state.roomCode);
    this.props.changeScreenStages([5,3]);
  }

  render() {
    console.log('apps.js', this.props.gameMessageList)
    console.log(this.props.screenStageStatus)
    if (this.state.username !== ''){
      return (
        <Router>
          <div>
            <Route
              path={'/user'}
              render={ (props) => <User {...props}
                emitMessage={this.emitMessage}
                question={this.state.question}
                messages={this.props.gameMessageList}
                vote={this.voteMessage}
                username={this.state.username}
                startGameFunc={this.startGameFunc}
                currentRound={this.props.gameRound}
                screenStageStatus={this.props.screenStageStatus}
                /> }
              />
          </div>
        </Router>
      );
    } else {
      return (
        <Router>
          <div>
            <Route
              path='/user'
              render={ (props) => <Login {...props}
                emitUser={this.emitUser}
                user={this.state.username}
                error={this.state.error}
                reLoginUserOnReload={this.reLoginUserOnReload}
                /> }
              />
            <Route
              path={'/central'}
              render={ (props) => <Central {...props}
                roomCode={this.state.roomCode}
                messages={this.props.gameMessageList}
                question={this.state.question}
                users={this.state.users}
                startGameFunc={this.startGameFunc}
                votes={this.props.gameVotes}
                currentRound={this.props.gameRound}
                screenStageStatus={this.props.screenStageStatus}
                /> }
              />
          </div>
        </Router>
      )
    }

  }
}

const mapStateToProps = (state) => {
  return {
    screenStageStatus: state.screenStageStatus[state.screenStageStatus.length-1],
    gameVotes: state.gameVotes[state.gameVotes.length-1],
    gameMessageList: state.gameMessageList,
    gameRound: state.gameRound
  }
}

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    changeScreenStages,
    addMessage,
    setGameRoundVotes,
    incGameRound
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(App);