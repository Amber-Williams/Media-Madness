import React, { Component } from 'react';


export default class User extends Component {

  saySomething(event){
    event.preventDefault()
    this.props.emitMessage( document.getElementById('m').value );
    document.getElementById('m').value = '';
  }

  render() {
    return (
      <div>
        <h1>user is here</h1>
        <form action="">
          <input id="m" autoComplete="off" />
          <button onClick={this.saySomething.bind(this)}>test</button>
        </form>

      </div>
    )
  }
}
