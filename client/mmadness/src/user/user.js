import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';
import './user.css';
import logo from './../img/MM-logo.png';

export default class User extends Component {
  constructor(){
    super()
    this.state = {
      searchedGif: [],
      submittedGif: '',
      summitButton: '',
      waiting: false
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
    this.setState({
      waiting: true
    })

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

  waiting(){
    this.setState({
      waiting: true
    })
  }

  render() {
    const message = this.props.messages
    .map((message, key) => 
      <li key={key}>
        <img alt={message.message.title}  src={message.message.images.fixed_height_still.url}  onClick={()=> {this.props.vote(message.username, message.message.images.fixed_height.url, this.props.username); this.waiting()}}/> 
      </li>
    )

    // 2. search gif to submit &   // 3. you sure you want to submit this one?
    if (this.props.startGame && !this.state.waiting && !this.props.showSubmitted && !this.props.showScores) {
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
    // 7. END: loading screen (to que them to look at central)
    else if (this.props.showScores) {
      return (
        <div className='userContainer'>
          Look at central
          <img className="logo" src={logo}/>
        </div>
      )
    }
    // 1. waiting for game to be started
    else if (!this.props.startGame && !this.props.showScores) {
      return (
        <div className='userContainer'>
          <img className="logo" src={logo}/>
          <h4>Waiting for game to be started...</h4>
        </div>
      )
    }
    // 4. waiting for other players... (on central submission)
    else if (this.state.waiting && !this.props.showSubmitted && !this.props.showScores) {
      return (
        <div className='userContainer'>
          <h4>Waiting for other players to submit...</h4>
        </div>
      )
    } 
    // 6. waiting for other players votes (on vote submission)
    else if (this.props.waitingScreen) {
      return (
        <div className='userContainer'>
          <h4>Waiting for other players to submit votes...</h4>
        </div>
      )
    }
    // 5. show all gifs ( info sent by socket ) ability to vote (send back to socket-> socket updates database play)
    else {
      console.log(this.state.waiting, !this.props.showScores, this.props.showSubmitted) //true false true 
      return (
        <div className='userContainer'>
          <h4>Look at main screen and vote on your favorite</h4>
          <ul>{message}</ul>
        </div>
        )
      }

    }
  }



  
  



  
  
  ///// Below for text submissions:
  // saySomething(event){
    //   event.preventDefault()
    //   this.props.emitMessage( document.getElementById('m').value );
    //   document.getElementById('m').value = '';
    // }
    {/*
    Below for text submissions:
    <form action="">
    <input id="m" autoComplete="off" />
    <button onClick={this.saySomething.bind(this)}>test</button>
  </form> */}