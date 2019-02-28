import React, { Component } from 'react';
import ListGifs from './../listGifs/listGifs';


export default class User extends Component {
  constructor(){
    super()
    this.state = {
      searchedGif: []
    }
  }

  saySomething(event){
    event.preventDefault()
    this.props.emitMessage( document.getElementById('m').value );
    document.getElementById('m').value = '';
  }

  async searchGif(event){
    event.preventDefault();
    let searched = document.getElementById('searched').value;

    await fetch(`http://api.giphy.com/v1/gifs/search?api_key=rXTPJIC2ki2w3TA8aKiev8EkK8U1G3KT&q=${searched}`)
    .then(response => response.json())
    .then(data => this.setState ({
      searchedGif: data
    }));

  }

  render() {
    return (
      <div>
        <h1>user is here</h1>
        <form action="">
          <input id="m" autoComplete="off" />
          <button onClick={this.saySomething.bind(this)}>test</button>
        </form>

        Gif search bar:
        <form action="">
          <input id="searched" autoComplete="off" />
          <button onClick={this.searchGif.bind(this)}>test</button>
          < ListGifs searchedGif={this.state.searchedGif}/>
        </form>

      </div>
    )
  }
}


// api.giphy.com/v1/gifs/search?api_key=rXTPJIC2ki2w3TA8aKiev8EkK8U1G3KT&q=test

//images.fixed_height.url