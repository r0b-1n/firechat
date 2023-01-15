import React, {useState, useEffect, useRef} from 'react';
import { doc, onSnapshot } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

const firebaseConfig = {
  apiKey: "AIzaSyAPGoCZVbbeQugFq5vksbPZV3zXAXan2EE",
  authDomain: "discord-2-52e82.firebaseapp.com",
  projectId: "discord-2-52e82",
  storageBucket: "discord-2-52e82.appspot.com",
  messagingSenderId: "31766851232",
  appId: "1:31766851232:web:5105eb05fb6006f34123c5",
  measurementId: "G-8K45NJJM44"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function Contact() {

  var msg

  /*const unsub = onSnapshot(doc(db, "messages", "S9Rh6QK8KaPJevLF1WW7775rlTt2abdel"), (doc) => {
    //const source = doc.metadata.hasPendingWrites ? "Local" : "Server";
    msg = (doc.data());
    console.log(msg)
  });*/

  /*const [Text, setText] = useState(0);

  const updateText = () => {

    onSnapshot(doc(db, "messages", "S9Rh6QK8KaPJevLF1WW7775rlTt2abdel"), (doc) => {
      msg = (doc.data());
      console.log(msg)
    });

    setText(msg)
    console.log(Text)
  }

  setInterval(updateText, 10000);*/

  const scroll = useRef()


  const [messages, setMessages] = useState([])
  
  function GetData () {
  
  useEffect(() => {
      db.collection('messages').orderBy('createdAt').limit(50).onSnapshot(snapshot => {
          setMessages(snapshot.docs.map(doc => doc.data()))
      })
  }, [])
}

  return (
    <div className="Chat">
      <header className="App-Header">
        <h1>Your Chats</h1>
          {messages.map(({text}) => (
                    <div>
                        <p>{text}</p>
                    </div>
          ))}
      </header>
    </div>
  );
}
export default Contact;