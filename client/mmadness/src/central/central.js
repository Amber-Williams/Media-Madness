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

    return (
      <div className="centralApp">
        <h1> central is here</h1>
        {this.props.question}
        {message}
      </div>
    )
  }
}

