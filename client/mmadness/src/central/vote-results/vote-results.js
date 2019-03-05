import React, { Component } from 'react';
import './../central.css';

export default class VoteResults extends Component {
  render() {
    let messageVotes = '';
    
    if(this.props.votes) {
      messageVotes = this.props.votes
        .filter(message => { 
          if (message.round === this.props.currentRound){
            return message
          }
        })
        .sort((a, b) => {return b.votes.length - a.votes.length})
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
        <h1> THE VOTES ARE IN </h1>
        <div className="resultsListContainerVotes">
          {messageVotes}
        </div>
      </div>
  )
  }
}