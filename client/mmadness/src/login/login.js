import React, { Component } from 'react';

export default class Login extends Component {

  userLogged(event){
    event.preventDefault();
    let username = document.getElementById('userIs').value;
    this.props.emitUser(username);

    ///// helppppp 
    // fetch('mongodb://localhost/game_data/userlogs')
    // .then(res => res.json())
    // .then(res => console.log(res))
  }

  // async onLogin(){ // Delete this later
  //   await fetch('http://localhost:3000/api/user')
  //   .then(res => res.json())
  //   .then(res => console.log(res))
  // }

  render() {
    return (
      <div>
        <h1 onClick={this.onLogin}>Must log in:</h1>

        <form action="">
          <input id="userIs" autoComplete="off" />
          <button onClick={this.userLogged.bind(this)}>Submit</button>
        </form>

        <br/>
      </div>
    )
  }
}
