import React, { Component } from 'react';

export default class ListGifs extends Component {

  sendGif(selectedGif){
    this.props.emitMessage(selectedGif);
  }

  render() {
    const gifList = this.props.searchedGif.data;
    let gif;

    if (gifList) {
      gif = gifList.map((gif, key ) => 
          <li key={key}> <img src={gif.images.fixed_height.url} onClick={this.sendGif.bind(this, gif)}/> </li> 
       )
    }
  
    if (gifList){
      return (
        <div>
          <ul>{gif}</ul>
        </div>
      )
    } else {
      return (
        <div>
          List empty
        </div>
      )
    }
  }
}
