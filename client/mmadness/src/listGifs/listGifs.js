import React, { Component } from 'react';

export default class ListGifs extends Component {

  render() {
    const gifList = this.props.searchedGif.data;
    let gif;

    if (gifList) {
      gif = gifList.map((gif, key ) => 
          <li key={key}> 
            <img alt={gif.title} src={gif.images.fixed_height.url} onClick={this.props.handleGif.bind(this, gif)}/> 
          </li> 
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
        <div></div>
      )
    }
  }
}
