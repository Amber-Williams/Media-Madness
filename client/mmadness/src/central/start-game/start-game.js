import React, { Component } from 'react';
import './../central.css';

export default class StartGame extends Component {
  render() {
      return (
        <div className="centralApp">
        <ul>
          {this.props.users}
        </ul>
        <button className="blackButton" onClick={this.props.startGameFunc}>Start Game</button>
      </div>
    )
  }
}