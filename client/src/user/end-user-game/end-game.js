import React, { Component } from 'react';
import './../user.css';
import logo from './../../img/MM-logo.png';

export default class EndGame extends Component {

  render() {
      return (
      <div className='userBackground'>
        <div className='userContainer'>
          <img className="logo" src={logo}/>
          <button className="blackButton" onClick={this.props.startGameFunc}>Play again with same players</button>
          <br/>
          <button className="blackButton" onClick={this.props.startNewGameFunc}>New Players</button>
        </div>
      </div>
    )
  }
}