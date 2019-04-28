import React, { Component } from 'react';
import ListGifs from './../../listGifs/listGifs';
import './../user.css';

export default class SubmitGif extends Component {

  render() {
    return (
      <div className='userBackground'>
        <div className='userContainer'>
          <h1>{this.props.question}</h1>
          Gif search bar:
          <form action="">
            <input className="whiteInput" id="searched" placeholder="SEARCH GIFS" autoComplete="off" />
            <button className="blackButton" onClick={this.props.searchGif.bind(this)}>Search</button>
          </form>
            <div className={this.props.submittedGif === '' ? "gifContainer" : ""}>
              < ListGifs 
                handleGif={this.props.handleGif}
                searchedGif={this.props.searchedGif} 
                />
            </div>
            <div className="submittedGif">
              {this.props.submittedGif}
              {this.props.summitButton}
            </div>
        </div>
      </div>
    )
  }
}