import React, { Component } from 'react';
import './../central.css';

export default class StartRoundQuestion extends Component {
  render() {
      return (
        <div className="centralApp">
          <h1>{this.props.question}</h1>
          <h4>Use your phone to select a GIF to fit the line above</h4>
          <br/>
          Users in room:
          <ul>
            {this.props.users}
          </ul>
        </div>
    )
  }
}