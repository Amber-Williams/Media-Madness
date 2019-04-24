import React, { Component } from 'react';
import './../user.css';

export default class WaitingSubmit extends Component {
  render() {
      return (
        <div className='userBackground'>
          <div className='userContainer'>
            <h4>Waiting for other players to submit...</h4>
          </div>
        </div>
    )
  }
}