import React, { Component } from 'react';

export default class ListGifs extends Component {
  
  render() {
    const gifList = this.props.searchedGif.data;
    let gif;

    if (gifList) {
      gif = gifList.map((gif, key ) => 
          <li key={gif.id}> <img src={gif.images.fixed_height.url}/> </li> 
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

//images.fixed_height.url