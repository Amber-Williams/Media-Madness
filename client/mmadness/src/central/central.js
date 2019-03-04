import React, { Component } from 'react';
import './central.css';

import StartGame from './start-game/start-game';
import StartRoundQuestion from './start-round-question/start-round-question';
import Vote from './vote/vote';
import VoteResults from './vote-results/vote-results';

export default class Central extends Component {

  render() {

    let users = (<h3>no one is here</h3>);
    if (this.props.users.length > 0) {
      users = this.props.users
        .map((user,key) => 
        <li  key={key}> 
          <h3 className="whiteInput">{user.username}</h3>
        </li>
        )
    }

    if (this.props.centralStage === 4) {
      return (
        <VoteResults
        votes={this.props.votes}
        />
      )
    }

    else if (this.props.centralStage === 3) {
      return (
        <Vote
        question={this.props.question}
        users={users}
        messages={this.props.messages}
        />
      )
    }

    else if (this.props.centralStage === 2) {
      return (
        <StartRoundQuestion
        question={this.props.question}
        users={users}
        />
      )
    } 

    else {
      return (
        <StartGame 
        startGameFunc={this.props.startGameFunc}
        users={users}
        />
      )
    }
    
  }
}









