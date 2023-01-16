import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './Main';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Chat from './Chat';
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

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Main/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/about' element={<About/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/chat' element={<Chat/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/password' element={<Password/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
