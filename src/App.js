import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from './pages/Main';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Password from './pages/Password';

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
