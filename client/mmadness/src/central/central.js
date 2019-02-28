import React, { Component } from 'react';
import './central.css';
import questionData from './../helpers/questions.json';

const filteredPickOne = questionData.blackCards
  .filter(quest => {
    if(quest.pick === 1){
      return quest;
    }
  });
const question = filteredPickOne[ Math.floor(Math.random() * Math.floor(filteredPickOne.length-1))]

export default class Central extends Component {
  
  render() {
    const message = this.props.messages
      .map((message, key) => <li key={message.id}>{message}</li>)
    
    return (
      <div className="centralApp">
        <h1> central is here</h1>
        {question.text}
        {message}
      </div>
    )
  }
}