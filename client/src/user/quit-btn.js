import React from 'react';
import './user.css';

export default function QuitBtn(props) {
  function forwardToLogin(){
    props.history.push('/')
  }
  return (
    <button>Quit</button>
  );
}