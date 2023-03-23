import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db, auth, secret, appname } from './App';
import { signInWithEmailAndPassword } from "firebase/auth";
import Cookies from 'universal-cookie';
import { decrypt } from 'n-krypta';
import { TypeAnimation } from 'react-type-animation';


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

const email = makeid(5)+"@firechat.com"  // Random for now
const password = makeid(20)
const username = makeid(5)

async function document() { // Create a user document
  const user = auth.currentUser;
  const uid = user.uid;
  await setDoc(doc(db, "user", uid), {
    email: email,
    password: password,
    uid: uid,
    name: username,
  });
  cookies.set('email', email /*encrypt(email, secret)*/, { path: '/' });
  cookies.set('password', password /*encrypt(password, secret)*/, { path: '/' });
  cookies.set('username', username /*encrypt(email, secret)*/, { path: '/' });
  cookies.set('uid', uid /*encrypt(email, secret)*/, { path: '/' });
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
          <h1>FireChat</h1>

          <TypeAnimation
          sequence={[
            'Hallo',
            1000,
            'Willkommen',
            1000,
            'Hi',
            1000,
            'Moin',
            1000,
            'Servus',
            1000,
            () => {
              console.log('TypeAnimation Loop fertig!');
            }
          ]}
          wrapper="div"
          cursor={true}
          repeat={Infinity}
          style={{ fontSize: '2em' }}
          />

          &nbsp;
          <button onClick={CreateNewUser}>Öffne {appname} in deinem Browser</button>
          &nbsp;
          <Link className="App-link" to="/login"> Login mit einem existierenden Account </Link>
          &nbsp;
          <Link className="App-link" to="/about"> Über FireChat </Link>
          <Link className="App-link" to="/contact"> Kontakt </Link>
          <a
          className="App-link"
          href="https://github.com/fire-chat-web/firechat"
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