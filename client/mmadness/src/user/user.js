import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';

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
      summitButton: <button onClick={(event) => {this.submitGif(selectedGif, event)}}>Submit</button>
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

  
  searchGif(event){
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

  test(){
    this.setState({
      waiting: true
    })
  }

  
  
  render() {
    const message = this.props.messages
    .map((message, key) => 
      <li key={key}>
        <img alt={message.message.title}  src={message.message.images.fixed_height_still.url}  onClick={()=> {this.props.vote(message.username, message.message.images.fixed_height.url, this.props.username); this.test()}}/> 
      </li>
    )

    // 2. search gif to submit &   // 3. you sure you want to submit this one?
    if (this.props.startGame && !this.state.waiting && !this.props.showSubmitted) {
      return (
        <div>
          {this.props.question}
          <h1>user is here</h1>
          Gif search bar:
          <form action="">
            <input id="searched" autoComplete="off" />
            <button onClick={this.searchGif.bind(this)}>Search</button>
            < ListGifs 
              handleGif={this.handleGif}
              searchedGif={this.state.searchedGif} 
              />
            {this.state.submittedGif}
            {this.state.summitButton}
          </form>
        </div>
      )
    } 
    // 1. waiting for game to be started
    else if (!this.props.startGame){
      return (
        <div>
          <h1>user is here</h1>
          <h4>Waiting for game to be started</h4>
        </div>
      )
    }
    // 4. waiting for other players... (on central submission)
    else if (this.state.waiting && !this.props.showSubmitted){
      return (
        <div>
          <h1>user is here</h1>
          <h4>Waiting for other players to submit</h4>
        </div>
      )
    } 
    // 6. waiting for other players votes (on vote submission)
    else if (this.state.waiting) {
      return (
        <div>
          <h1>user is here</h1>
          <h4>Waiting for other players to submit votes</h4>
        </div>
      )
    }
    // 5. show all gifs ( info sent by socket ) ability to vote (send back to socket-> socket updates database play)
    else {
      return (
        <div>
          <h1>user is here</h1>
          <h4>Look at main screen and vote on your favorite</h4>
          {message}
        </div>
        )
      }
      
    }
  }

  

  

  // 7. loading screen (to que them to look at central)
  
  



  
  
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