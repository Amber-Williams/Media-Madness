import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';

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
      submittedGif: <img src={selectedGif.images.fixed_height.url}/>,
      summitButton: <button onClick={(event) => {this.submitGif(selectedGif, event)}}>Submit</button>
    })
  }

  submitGif = (selectedGif, event) => {
    event.preventDefault();
    this.props.emitMessage(selectedGif);
    this.clearSearch()
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
  
  render() {
    // 2. search gif to submit &   // 3. you sure you want to submit this one?
    if (this.props.startGame) {
      return (
        <div>
          {this.props.question}
          <h1>user is here</h1>
          
  
          Gif search bar:
          <form action="">
            <input id="searched" autoComplete="off" />
            <button onClick={this.searchGif.bind(this)}>Search</button>
            < ListGifs 
              handleGif={this.handleGif} // Bug: on every other log in the person works
              searchedGif={this.state.searchedGif} 
              // emitMessage={this.props.emitMessage} //d
              // clearSearch={this.clearSearch.bind(this)} //d
              />
            {this.state.submittedGif }
            {this.state.summitButton}
          </form>
        </div>
      )
    } 
    // 1. waiting for game to be started
    else {
      return (
        <h1>Waiting for game to be started</h1>
        )
      }
      
    }
  }

  

  // 4. waiting for other players... (on central submission)
  // 5. show all gifs ( info sent by socket ) ability to vote (send back to socket-> socket updates database play)
  // 6. loading screen (to que them to look at central)
  
  



  
  
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