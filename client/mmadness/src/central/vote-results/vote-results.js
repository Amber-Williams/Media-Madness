import React, { Component } from 'react';
import './../central.css';

export default class VoteResults extends Component {
  render() {
    let messageVotes = '';
    
    if(this.props.votes) {
      messageVotes = this.props.votes
      .map((message, key) => 
      <div className="resultContainer" key={key}>
        <h4>{message.user}</h4>
        <img alt={message.gif} src={message.gif}/> 
        <div> 
          Votes:  
          <ul>
            {message.votes.map(ele => { return <li>{ele}</li> } )}
          </ul> 
        </div>
      </div>
      )
    }

      return (
        <div className="centralApp">
          <h1> The Votes are in: </h1>
          <div className="resultsListContainer">
            {messageVotes}
          </div>
        </div>
    )
  }
}