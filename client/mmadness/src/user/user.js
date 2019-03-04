import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';
import './user.css';
import logo from './../img/MM-logo.png';

import WaitingGameStarted from './waiting-game-started/waiting-game-started';
import EndGame from './end-user-game/end-game';
import WaitingSubmit from './waiting-submit/waiting-submit';
import WaitingVotes from './waiting-votes/waiting-votes';
import Voting from './voting/voting';

export default class User extends Component {
  constructor(){
    super()
    this.state = {
      searchedGif: [],
      submittedGif: '',
      summitButton: ''
    }
  }

  handleGif = (selectedGif) => {
    this.clearSearch()
    this.setState({
      submittedGif: <img alt={selectedGif.title} src={selectedGif.images.fixed_height.url} />,
      summitButton: <button className="blackButton" onClick={(event) => {this.submitGif(selectedGif, event)}}>Submit</button>
    })
  }

  submitGif = (selectedGif, event) => {
    event.preventDefault();
    this.props.emitMessage(selectedGif);
    this.clearSearch()
  }

  
  searchGif (event){
    event.preventDefault();
    let searched = document.getElementById('searched').value;
    fetch(`http://api.giphy.com/v1/gifs/search?api_key=rXTPJIC2ki2w3TA8aKiev8EkK8U1G3KT&q=${searched}`)
    .then(response => response.json())
    .then(data => this.setState ({
       searchedGif: data
    }));
  }
  
  clearSearch(){
    this.setState({
      searchedGif: [],
      submittedGif:'',
      summitButton: ''
    })
  }


  render() {
     
    if (this.props.userStage === 6) {
      return (
        <EndGame/>
      )
    }

    else if (this.props.userStage === 5) {
      return (
        <WaitingVotes/>
      )
    }
  
    else if (this.props.userStage === 4) {
      return (
        <Voting 
        vote={this.props.vote}
        messages={this.props.messages}
        username={this.props.username}
        />
      )
    }

    else if (this.props.userStage === 3) {
      return (
        <WaitingSubmit/>
      )
    }
    
    else if (this.props.userStage === 2) {
      return (
        <div className='userContainer'>
          <h1>{this.props.question}</h1>
          Gif search bar:
          <form action="">
            <input className="whiteInput" id="searched" placeholder="SEARCH GIFS" autoComplete="off" />
            <button className="blackButton" onClick={this.searchGif.bind(this)}>Search</button>
          </form>
            <div className={this.state.submittedGif === '' ? "gifContainer" : ""}>
              < ListGifs 
                handleGif={this.handleGif}
                searchedGif={this.state.searchedGif} 
                />
            </div>
            <div className="submittedGif">
              {this.state.submittedGif}
              {this.state.summitButton}
            </div>
        </div>
      )
    }
    else {
      return (
       <WaitingGameStarted/>
      )
    }
  }

}