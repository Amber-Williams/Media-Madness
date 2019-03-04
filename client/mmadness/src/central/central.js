import React, { Component } from 'react';
import './central.css';

export default class Central extends Component {
  state ={
    stage: 1
  }

  render() {

    const messageNoAuthor = this.props.messages
    .map((message, key) => 
      <li key={key}> 
        <img alt={message.message.title} src={message.message.images.fixed_height.url}/> 
      </li>
    )

    let messageVotes = '';
    if(this.props.votes) {
      messageVotes = this.props.votes
      .map((message, key) => 
      <div key={key}>
        <h4>{message.user}</h4>
        <img alt={message.gif} src={message.gif}/> 
        <p> Votes: {message.votes}</p>
      </div>
      )
    }

    let users = (<h3>no one is here</h3>);
    if (this.props.users.length > 0) {
      users = this.props.users
        .map((user,key) => 
        <li key={key}> 
          <h3>{user.username}</h3>
        </li>
        )
    }
    //move the above logic else where

    // 4. Vote results
    if (this.props.showScores) {
      console.log(this.props.votes)
      return (
        <div className="centralApp">
          <h1> central is here</h1>
          {messageVotes}
        </div>
      )
    }
    // 2. start screen with round question & players who have submitted // with next button
    else if (this.props.startGame && this.props.users.length > 0 && !this.props.showSubmitted) {
      return (
        <div className="centralApp">
          <h1> central is here </h1>
          {this.props.question}
          <br/>
          <ul>
            {users}
          </ul>
          <button onClick={this.props.showSubmittedFunc}>Show Submitted</button>
        </div>
      )
    } 
    
    // 3. show gifs & vote on your screen!
    else if (this.props.showSubmitted) {
      return (
        <div className="centralApp">
          <h1> central is here </h1>
          {this.props.question}
          <h4> Vote on your Screen now! </h4>
          {messageNoAuthor}
          <br/>
          <ul>
            {users}
          </ul>
        </div>
      )
    }
    // 1. whos joined screen with start button
    else {
      return (
        <div className="centralApp">
          <h1> central is here</h1>
          <ul>
            {users}
          </ul>
          <button onClick={this.props.startGameFunc}>Start Game</button>
        </div>
      )
    }
    
  }
}

//Break up screens into strages
  //if this stage render that component









