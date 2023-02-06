import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db, auth, secret, appname } from './App';
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from 'universal-cookie';
import { decrypt } from 'n-krypta';

const cookies = new Cookies();  // Cookie Manager

function makeid(length) {   //Methode to generate a random password/email
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const email = makeid(5)+"@neo-discord.com"  // Random for now
const password = makeid(10)+"neo-discord"

async function document() { // Create a user document
  const user = auth.currentUser;
  const uid = user.uid;
  await setDoc(doc(db, "user", uid), {
    email: email,
    password: password,
    uid: uid,
    name: "User",
  });
}

function Welcome() {

  const navigate = useNavigate(); // Navigator

  var savee = cookies.get('email') //decrypt(cookies.get('email'), secret)  // Cookie getter
  var savep = cookies.get('password') //decrypt(cookies.get('password'), secret)

  function saveduser() {  // If there is a user login
    if ( savee && savep !== undefined)
    {
      console.log("Found a users data in cookies")
      signInWithEmailAndPassword(auth, savee, savep)
        .then((userCredential) => {
        navigate("/home")
        })
      }
  }

  saveduser() // Methode

  function CreateNewUser() {  // User creator
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("Created user", user);
      document()
      navigate("/home")
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(errorCode);
      console.log(errorMessage);
    });
  }

  return (
    <div className="Welcome">
      <header className="App-header">
          <h1>{appname}</h1>
          &nbsp;
          <button onClick={CreateNewUser}>Open {appname} in your browser</button>
          &nbsp;
          <Link className="App-link" to="/login"> Login with existing account </Link>
          &nbsp;
          <Link className="App-link" to="/about"> About page </Link>
          <Link className="App-link" to="/contact"> Contact </Link>
          <a
          className="App-link"
          href="https://github.com/neo-chat/neo-chat-web"
          target="_blank"
          rel="noopener noreferrer"
          >
          Source Code
        </a>      
        </header>
    </div>
  );
}
export default Welcome;