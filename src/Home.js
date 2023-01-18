import React, {useState} from 'react';
import {useNavigate } from "react-router-dom"
import { signOut } from "firebase/auth";
import { db, auth } from './App';
import { doc, setDoc, getDoc } from "firebase/firestore"; 
import { getAuth, onAuthStateChanged } from "firebase/auth";

var email;
var password;
var Name;

function Home() {

  const navigate = useNavigate();
  var uid
  var userin

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

  async function Chat () {
    await setDoc(doc(db, "messages", uid+userin), {
      created: "Today"
    });
  }

    let time = new Date().toLocaleTimeString();
    const [Time, setTime] = useState(time);

    const updateTime = () => {
      let time = new Date().toLocaleTimeString();
      setTime(time)
    }

    setInterval(updateTime, 1000);

  return (
    <div className="Home">
      <header className="App-header">
        <h1>Hey {Name}, {email}, {password}</h1>
        <h1>Currently its {Time}</h1>
        <input type="text" placeholder="Enter the persons uid" onChange={(evt) =>  { userin = (evt.target.value); }}/>
        &nbsp;
        <button onClick={Chat}>Create new chat</button>
        &nbsp;
        <div></div>
        &nbsp;
        <button onClick={Logout}>Logout</button>
      </header>
    </div>
  );
}

export default Home;
