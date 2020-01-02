import React, { Component } from 'react';
import './login.css';
import logo from './../img/MM-logo.png';
import socket from './../socket/socket';

export default class Login extends Component {
  state = {
    errorStyle:''
  }

  componentWillMount() {
    if (localStorage.getItem('userLogInfo')) {
      const userInfo = JSON.parse(localStorage.getItem('userLogInfo'))
      socket.emit('Does room still exist? If so update with new socketID and rejoin', userInfo);
    }
  }

  userLogged(event){
    event.preventDefault();
    const username = document.getElementById('userIs').value.toUpperCase();
    const roomCode = document.getElementById('roomCodeIs').value.toUpperCase();
    if(username.length > 0){
      this.props.emitUser(username, roomCode);
      this.props.history.push('/user')
    }
  }


  render() {
    return (
      <div className="loginBackground">
        <div className="loginContainer">
          <img className="logo" src={logo}/>
          <form action="">
            <input className="whiteInput toUpperCase" id="roomCodeIs" placeholder="ROOMCODE" autoComplete="off" />
            <input className="whiteInput toUpperCase" id="userIs" placeholder="NICKNAME" autoComplete="off" />
            <button className="blackButton" onClick={this.userLogged.bind(this)}>Submit</button>
            <p> {this.props.error} </p>
          </form>
        </div>
      </div>
    )
  }
}
