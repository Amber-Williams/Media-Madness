import React, { Component } from 'react';
import './../user.css';

export default class Voting extends Component {
  render() {
    const message = this.props.messages
    .map((message, key) => 
      <li key={key}>
        <img alt={message.message.title}  src={message.message.images.fixed_height_still.url}  onClick={()=> {this.props.vote(message.username, message.message.images.fixed_height.url, this.props.username)}}/> 
      </li>
    )
      return (


        <div className='userContainer'>
          <h4>Look at main screen and vote on your favorite</h4>
          <div className='gifContainer'>
            <div className="gifsLoaded">
              <ul>{message}</ul>
            </div>
          </div>
        </div>
    )
  }
}