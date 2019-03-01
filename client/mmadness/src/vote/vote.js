import React, { Component } from 'react';

//show question
//show submitted gifs

export default class Central extends Component {
  
  render() {
    // const message = this.props.messages
    //   .map((message, key) => 
    //     <li key={message.id}> 
    //       <h4>{this.props.user}</h4>
    //       <img src={message.images.fixed_height.url}/> 
    //     </li>
    //   )
    
    return (
      <div className="centralApp">
        <h1> Vote is here</h1>
        {/* {question.text}
        {message} */}
      </div>
    )
  }
}