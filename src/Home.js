import React, { useEffect, useRef, useState} from 'react';
import {useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { db, auth } from './App';
import { collection, limit, orderBy, query, doc, setDoc, getDoc, serverTimestamp, addDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore"
import {useAuthState} from 'react-firebase-hooks/auth'
import Cookies from 'universal-cookie';
import { TypeAnimation } from 'react-type-animation';

const cookies = new Cookies();

var password;
var Name;
var username;
var email;

var chat = "_official";


const GetData = async() => {
  if (!auth.currentUser) return
  var uid = auth.currentUser.uid
  const docRef = doc(db, "user", uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    Name = docSnap.get("name")
    cookies.set('username', Name /*encrypt(password, secret)*/, { path: '/' });
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

GetData()

const DisplayData = async() => {
  email = cookies.get('email') //decrypt(cookies.get('email'), secret)  // Cookie getter
  password = cookies.get('password') //decrypt(cookies.get('password'), secret)
  username = cookies.get('username') //decrypt(cookies.get('username'), secret)  // Cookie getter
}

DisplayData()

function Home() {

  const navigate = useNavigate();
  var uid
  var userin

  onAuthStateChanged(auth, (user) => {
    if (user) {
      uid = user.uid;
    } else {
      navigate("/")    
    }
  });

  const Logout = async () => {
    try {
      navigate("/")
      signOut(auth)
      cookies.remove('email')
      cookies.remove('password')
    } catch (error){
      console.log(error)
    }
  }

  async function Chat () {
    await setDoc(doc(db, "messages", uid+"-"+userin), {
      created: "Today"
    });
  }

    /*let time = new Date().toLocaleTimeString();
    const [Time, setTime] = useState(time);

    const updateTime = () => {
      let time = new Date().toLocaleTimeString();
      setTime(time)
    }

    setInterval(updateTime, 1000);*/

    const [user] = useAuthState(auth)

  const messageRef = collection(db, "messages", "chat", "messages")
  const queryRef = query(messageRef, orderBy("createdAt", "desc"), limit(20))
  const [messages] = useCollection(queryRef, {idField: "id"})
  console.log("Messages")

  const [formValue, setFormValue] = useState('')

  const scrollTo = useRef(null)

  const sendMessage = async(e) => { // Message send Methode 
    e.preventDefault()
    
    const payload = {text: formValue, createdAt: serverTimestamp(), uid: user.uid, name: "Robin"}
    await addDoc(messageRef, payload)
    
    setFormValue('')
  }

  function ChatMessage(props){  // Chat message getter?
    const {text, uid, name} = props.message

    const className = uid === auth.currentUser.uid ? "sent" : "recieved"

    console.log("ChatMessage")

    return (
      <div className={className}>
        <p>{name}:</p>
        <p>{text}</p>
      </div>
    )
  }

  useEffect(() => { // Scroller
    scrollTo.current.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const [userChoice, setUserChoice] = useState("");
  
  chat = userChoice.value;
  //chatter = userChoice.label;

  return (
    <div className="Home">
      <header className="App-header">

        <p> Email: {email} </p>
        <p>Passwort: {password}</p>
        <p>Willkommen, {username}</p>

        <div className='messages'>
          <div ref={scrollTo}></div>
          {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}
        </div>

        &nbsp;
        <form>
          <input value={formValue} placeholder="Nachricht" onChange={(e) => setFormValue(e.target.value)} />
        &nbsp;
          <button onClick={(e) => sendMessage(e)}>Senden</button>
        </form>
        &nbsp;
        <button onClick={Logout}>Logout</button>
      </header>
    </div>
  );
}

export default Home;
