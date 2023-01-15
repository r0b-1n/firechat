import React, {useState} from 'react';
import {useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

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
const auth = getAuth();
const user = auth.currentUser;

function Home() {

  const navigate = useNavigate();
  var email
  var password
  var uid
  var userin

  const auth = getAuth();
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
    } catch (error){
      console.log(error)
    }
  }

  /*async function getdata() {
    const docRef = doc(db, "user", uid);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      email = docSnap.get("email")
      password = docSnap.get("password")
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }*/

  //getdata()

  async function Chat () {
    await setDoc(doc(db, "messages", uid+userin), {
      created: "Today"
    });
  }

  //

    let time = new Date().toLocaleTimeString();
    const [Time, setTime] = useState(time);

    const updateTime = () => {
      let time = new Date().toLocaleTimeString();
      setTime(time)
    }

    setInterval(updateTime, 1000);

  //

  return (
    <div className="Home">
      <header className="App-header">
        <h1>Currently its {Time}</h1>
        <input type="text" placeholder="Enter the persons uid" onChange={(evt) =>  { userin = (evt.target.value); }}/>
        &nbsp;
        <button onClick={Chat}>Create new chat</button>
        &nbsp;
        <section>
          <p>Your chats</p>
          <p>//Render chats here...</p>
        </section>
        &nbsp;
        <button onClick={Logout}>Logout</button>
      </header>
    </div>
  );
}

export default Home;
