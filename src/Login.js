import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './App';
import {useNavigate, Link } from "react-router-dom"

var email
var password

function Login() {

  const navigate = useNavigate();

  function login() {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user)
        navigate("/home")
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
        console.log(email)
        console.log(password)
      });
    }

    return (
      <div className="Login">
        <header className="App-header">
          <h1 className="login">Welcome back!</h1>
          <input type="text" placeholder="E-Mail" onChange={(evt) =>  { email = (evt.target.value); }}/>
          &nbsp;
          <input type="password" placeholder="Password" onChange={(evt) =>  { password = (evt.target.value); }}/>
          &nbsp;
          <button className="button-login" onClick={login}>Login</button>
          &nbsp;
          <Link className="App-link" to="/password"> Forgot password? </Link>
          &nbsp;
          <Link className="App-link" to="/"> Register </Link>
        </header>
      </div>
    );
  }
  
  export default Login;