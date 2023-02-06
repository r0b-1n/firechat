import React from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, secret } from './App';
import {useNavigate, Link } from "react-router-dom"
import Cookies from 'universal-cookie';
import { encrypt } from 'n-krypta';

var email;
var password;

function Login() {

  const navigate = useNavigate(); // Navigator

  function login() {
    signInWithEmailAndPassword(auth, email, password) // Sign in Methode
      .then((userCredential) => {
        const user = userCredential.user;
        const cookies = new Cookies();
        console.log("User " + user + "has been logged in")
        cookies.set('email', email /*encrypt(email, secret)*/, { path: '/' });
        cookies.set('password', password /*encrypt(password, secret)*/, { path: '/' });
        navigate("/home") // Final Navigate
      })
      .catch((error) => { // Error Code Handling
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode)
        console.log(errorMessage)
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
          <Link className="App-link" to="/"> Don't have a account yet? </Link>
        </header>
      </div>
    );
  }
  
  export default Login;