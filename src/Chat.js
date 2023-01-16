import React from 'react';
import { db, auth } from './App';
import { collection, limit, orderBy, query, addDoc, serverTimestamp } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore"
import {useAuthState} from 'react-firebase-hooks/auth'
import { useEffect, useRef, useState } from 'react';

function Contact() {

  const [user] = useAuthState(auth)

  const messageRef = collection(db, "messages", "test", "1")
  const queryRef = query(messageRef, orderBy("createdAt", "asc"), limit(20))
  const [messages] = useCollection(queryRef, {idField: "id"})

  const [formValue, setFormValue] = useState('')

  const scrollTo = useRef(null)

  const sendMessage = async(e) => {
    e.preventDefault()
    
    const payload = {text: formValue, createdAt: serverTimestamp(), uid: user.uid}
    await addDoc(messageRef, payload)
    
    setFormValue('')
  }

  function ChatMessage(props){
    const {text, uid} = props.message

    const className = uid === auth.currentUser.uid ? "sent" : "recieved"

    return (
      <div className={className}>
        <p>{text}</p>
      </div>
    )
  }

  useEffect(() => {
    scrollTo.current.scrollIntoView({behavior: "smooth"})
  }, [messages])

  return (
    <div className="Chat">
      <header className="App-Header">
        <div className='messages'>
          <div ref={scrollTo}></div>
          {messages && messages.docs.map(msg => <ChatMessage key={msg.id} message={msg.data()} />)}
        </div>
        <form>
          <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
          <button onClick={(e) => sendMessage(e)}>Send</button>
        </form>
      </header>
    </div>
  );
}
export default Contact;