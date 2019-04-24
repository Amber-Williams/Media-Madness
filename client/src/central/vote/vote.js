import React, { Component } from 'react';
import './../central.css';

export default class Vote extends Component {
  render() {

    const messageNoAuthor = this.props.messages
      .filter(message => { 
        if (message.round === this.props.currentRound){
          return message
        }
      })
      .map((message, key) => 
        <div className="resultContainer" key={key}> 
          <img alt={message.message.title} src={message.message.images.fixed_height.url}/> 
        </div>
      )

      return (
        <div className="centralApp">
          <h1>{this.props.question}</h1>
          <h4> Vote on your Screen now! </h4>
          <div className="resultsListContainer">
            {messageNoAuthor}
          </div>
          <br/>
          Users in room:
          <ul>
            {this.props.users}
          </ul>
        </div>
    )
  }
}