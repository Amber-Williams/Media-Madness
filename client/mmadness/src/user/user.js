import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';
import RoundQuestion from './../round-question/round-question';


export default class User extends Component {
  constructor(){
    super()
    this.state = {
      searchedGif: []
    }
  }
  ///// Below for text submissions:
  // saySomething(event){
  //   event.preventDefault()
  //   this.props.emitMessage( document.getElementById('m').value );
  //   document.getElementById('m').value = '';
  // }

  async searchGif(event){
    event.preventDefault();
    let searched = document.getElementById('searched').value;

    await fetch(`http://api.giphy.com/v1/gifs/search?api_key=rXTPJIC2ki2w3TA8aKiev8EkK8U1G3KT&q=${searched}`)
    .then(response => response.json())
    .then(data => this.setState ({
      searchedGif: data
    }));
  }

  clearSearch(){
    this.setState({
      searchedGif: []
    })
  }

  render() {
    return (
      <div>
        <RoundQuestion/>
        <h1>user is here</h1>
        
        {/*
        Below for text submissions:
        <form action="">
          <input id="m" autoComplete="off" />
          <button onClick={this.saySomething.bind(this)}>test</button>
        </form> */}

        Gif search bar:
        <form action="">
          <input id="searched" autoComplete="off" />
          <button onClick={this.searchGif.bind(this)}>Search</button>
          < ListGifs 
            searchedGif={this.state.searchedGif} 
            emitMessage={this.props.emitMessage}
            clearSearch={this.clearSearch.bind(this)}
          />
        </form>

      </div>
    )
  }
}