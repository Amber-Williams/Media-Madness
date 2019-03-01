import React, { Component } from 'react';
import './central.css';

export default class Central extends Component {
  
  render() {
    const message = this.props.messages
      .map((message, key) => 
        <li key={message.id}> 
          <h4>{this.props.user}</h4>
          <img src={message.images.fixed_height.url}/> 
        </li>
      )
    if(this.props.question){
      return (
        <div className="centralApp">
          <h1> central is here</h1>
          {this.props.question}
          {message}
        </div>
      )
    } 
    else {
      return (
        <div className="centralApp">
          <h1> Users need to join: question not loaded</h1>
          {/* need to add list of joined users here */}
        </div>
      )
    }
  }
}

