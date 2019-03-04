import React, { Component } from 'react';
import './../user.css';
import logo from './../../img/MM-logo.png';

export default class EndGame extends Component {

  render() {
      return (
      <div className='userContainer'>
        Look at central
        <img className="logo" src={logo}/>
      </div>
    )
  }
}