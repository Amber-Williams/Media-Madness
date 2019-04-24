import React, { Component } from 'react';
import './../user.css';
import logo from './../../img/MM-logo.png';

export default class WaitingGameStarted extends Component {

  render() {
    return (
      <div className="userBackground">
        <div className="userContainer">
          <img className="logo" src={logo}/>
          <h4>Waiting for game to be started...</h4>
        </div>
      </div>
    )
  }
}