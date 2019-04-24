import React, { Component } from 'react';
import './../central.css';
import logo from './../../img/MM-logo.png';
import roomCodeOutline from './../../img/roomcode-cover.png';

export default class StartGame extends Component {
  render() {
      return (
        <div className="centralApp">
          <img className="logo--central" src={logo}/>
          <div className="startGameContainer">
            <h1>Room Code is:</h1>
            <div className="roomCodeContainer">
              <img src={roomCodeOutline}/>
              <h2>{this.props.roomCode}</h2>
            </div>
            
          </div>

        <ul>
          {this.props.users}
        </ul>
        <button className="blackButton" onClick={this.props.startGameFunc}>Start Game</button>
      </div>
    )
  }
}