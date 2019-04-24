import React, { Component } from 'react';
import './../user.css';

export default class Voting extends Component {
  render() {
    const message = this.props.messages
      .filter(message => {
        if ( message.round === this.props.currentRound) {
          if (this.props.username !== message.username) {
            return message
      }}})
      .map((message, key) => 
        <li key={key}>
          <img alt={message.message.title}  src={message.message.images.fixed_height.url}  onClick={()=> {this.props.vote(message.username, message.message.images.fixed_height.url, this.props.username)}}/> 
        </li>
    )
    
    return (
      <div className='userBackground'>
        <div className='userContainer'>
          <h4>Vote on your favorite answer:</h4>
          <div className='gifContainer'>
            <div className="gifsLoaded">
              <ul>{message}</ul>
            </div>
          </div>
        </div>
      </div>
    )
  }
}