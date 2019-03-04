import React, { Component } from 'react';
import './central.css';

export default class Central extends Component {
  state ={
    stage: 1
  }

  render() {

    const messageNoAuthor = this.props.messages
    .map((message, key) => 
      <div className="resultContainer" key={key}> 
        <img alt={message.message.title} src={message.message.images.fixed_height.url}/> 
      </div>
    )

    let messageVotes = '';
    if(this.props.votes) {
      messageVotes = this.props.votes
      .map((message, key) => 
      <div className="resultContainer" key={key}>
        <h4>{message.user}</h4>
        <img alt={message.gif} src={message.gif}/> 
        <p> Votes: 
          <ul>
            {message.votes.map(ele => { return <li>{ele}</li> } )}
          </ul> 
        </p>
      </div>
      )
    }

    let users = (<h3>no one is here</h3>);
    if (this.props.users.length > 0) {
      users = this.props.users
        .map((user,key) => 
        <li  key={key}> 
          <h3 className="whiteInput">{user.username}</h3>
        </li>
        )
    }
    //move the above logic else where

    // 4. Vote results
    if (this.props.showScores) {
      return (
        <div className="centralApp">
            <h1> The Votes are in: </h1>
            <div className="resultsListContainer">
            {messageVotes}
          </div>
        </div>
      )
    }
    // 2. start screen with round question & players who have submitted // with next button
    else if (this.props.startGame && this.props.users.length > 0 && !this.props.showSubmitted) {
      return (
        <div className="centralApp">
          {this.props.question}
          <ul>
            {users}
          </ul>
        </div>
      )
    } 
    
    // 3. show gifs & vote on your screen!
    else if (this.props.showSubmitted) {
      return (
        <div className="centralApp">
          {this.props.question}
          <h4> Vote on your Screen now! </h4>
          <div className="resultsListContainer">
            {messageNoAuthor}
          </div>
          <br/>
          Users in room:
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
          <ul>
            {users}
          </ul>
          <button className="blackButton" onClick={this.props.startGameFunc}>Start Game</button>
        </div>
      )
    }
    
  }
}

//Break up screens into strages
  //if this stage render that component









