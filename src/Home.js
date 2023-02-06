import React, { useEffect, useRef, useState} from 'react';
import {useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { db, auth } from './App';
import { collection, limit, orderBy, query, doc, setDoc, getDoc, serverTimestamp, addDoc } from "firebase/firestore"; 
import { onAuthStateChanged } from "firebase/auth";
import { useCollection } from "react-firebase-hooks/firestore"
import {useAuthState} from 'react-firebase-hooks/auth'
import Cookies from 'universal-cookie';
import Select from "react-select";

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
    console.log(docSnap.data())
    email = docSnap.get("email")
    password = docSnap.get("password")
    Name = docSnap.get("name")
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

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

  const messageRef = collection(db, "messages", chat, "messages")
  const queryRef = query(messageRef, orderBy("createdAt", "asc"), limit(20))
  const [messages] = useCollection(queryRef, {idField: "id"})
  console.log("Messages")

  const [formValue, setFormValue] = useState('')

  const scrollTo = useRef(null)

  const sendMessage = async(e) => { // Message send Methode 
    e.preventDefault()
    
    const payload = {text: formValue, createdAt: serverTimestamp(), uid: user.uid}
    await addDoc(messageRef, payload)
    
    setFormValue('')
  }

  function ChatMessage(props){  // Chat message getter?
    const {text, uid} = props.message

    const className = uid === auth.currentUser.uid ? "sent" : "recieved"

    console.log("ChatMessage")

    return (
      <div className={className}>
        <p>{text}</p>
      </div>
    )
  }

  useEffect(() => { // Scroller
    scrollTo.current.scrollIntoView({behavior: "smooth"})
  }, [messages])

  const selectOptions = [ // Chat options
    { value: "_official", label: "Neo Chat" },
    { value: "S9Rh6QK8KaPJevLF1WW7775rlTt2-eskXLZ9jXSbSOVwxagsPrABDwlq1", label: "Robin" }
  ];

  const [userChoice, setUserChoice] = useState("");
  
  var chatter

  chat = userChoice.value;
  chatter = userChoice.label;

  return (
    <div className="Home">
      <header className="App-header">
        <p>{Name} {email} {password}</p>
        <input type="text" placeholder="Enter the persons uid" onChange={(evt) =>  { userin = (evt.target.value); }}/>
        &nbsp;
        <button onClick={Chat}>Create new chat</button>
        &nbsp;

        <Select
        isClearable={false}
        className="react-select"
        classNamePrefix="select"
        options={selectOptions}
        onChange={(chioce) => setUserChoice(chioce)}
        />

        <p>Your chat with {chatter}</p>
        <div className='messages'>
          <div ref={scrollTo}></div>
          {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}
        </div>
        &nbsp;
        <form>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        &nbsp;
          <button onClick={(e) => sendMessage(e)}>Send</button>
        </form>
        &nbsp;
        <button onClick={Logout}>Logout</button>
      </header>
    </div>
  );
}

export default Home;
