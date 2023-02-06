import './App.css';

import { HashRouter, BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Main from './Main';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Password from './Password';

import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAPGoCZVbbeQugFq5vksbPZV3zXAXan2EE",
  authDomain: "discord-2-52e82.firebaseapp.com",
  projectId: "discord-2-52e82",
  storageBucket: "discord-2-52e82.appspot.com",
  messagingSenderId: "31766851232",
  appId: "1:31766851232:web:5105eb05fb6006f34123c5",
  measurementId: "G-8K45NJJM44"
};

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)
export const appname = "App Name"
export const secret = "OúÉùÑ;M½©êã\¸Ê@óDhúS·ÿûøaWòøÀWaó;´Æ¬k;¸ví]2pe³g@»üY;Hõ:ªOPò5Äd¸d³âç9/8Saï«º2RÜ¿ËÓ[¥U^«½ñQ+øõ®h³i¹ÐÅZ}g%A¤âjÚÖ5p³¢ËöXãØF·õ¢Vúuågÿ"

function App() {
  return (
    <div className="App">
      <HashRouter /*basename={process.env.PUBLIC_URL}*/ >
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/password' element={<Password/>} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;
