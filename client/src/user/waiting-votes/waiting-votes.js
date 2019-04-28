import React, { Component } from 'react';
import './../user.css';
import QuitBtn from './../quit-btn';

export default class WaitingVotes extends Component {
  render() {
      return (
        <div className='userBackground'>
          <div className='userContainer'>
            <h4>Waiting for other players to submit votes...</h4>
            {/* <QuitBtn/> */}
          </div>
        </div>
    )
  }
}