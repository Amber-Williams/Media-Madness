import React, { Component } from 'react';
import './../user.css';

export default class WaitingVotes extends Component {
  render() {
      return (
        <div className='userContainer'>
          <h4>Waiting for other players to submit votes...</h4>
        </div>
    )
  }
}