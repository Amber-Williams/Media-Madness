import React, { Component } from 'react';
import './login.css';
import logo from './../img/MM-logo.png';

export default class Login extends Component {

  
  userLogged(event){
    event.preventDefault();
    let username = document.getElementById('userIs').value;
    if(username.length > 0){
      this.props.emitUser(username);
      this.props.history.push('/user')
    }
  }

  render() {
    return (
      <div className="loginContainer">
        <img className="logo" src={logo}/>
        <form action="">
          <input className="whiteInput" id="userIs" placeholder="NICKNAME" autoComplete="off" />
          <button className="blackButton" onClick={this.userLogged.bind(this)}>Submit</button>
        </form>
      </div>
    )
  }
}
