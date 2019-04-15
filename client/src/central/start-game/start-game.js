import React, { Component } from 'react';
import './../central.css';
import logo from './../../img/MM-logo.png';

export default class StartGame extends Component {
  render() {
      return (
        <div className="centralApp">
          <img className="logo--central" src={logo}/>
          <div className="startGameContainer">
            <h1>Room Code is:</h1>
            <h2>{this.props.roomCode}</h2>
          </div>

        <ul>
          {this.props.users}
        </ul>
        <button className="blackButton" onClick={this.props.startGameFunc}>Start Game</button>
      </div>
    )
  }
}