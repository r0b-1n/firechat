import { useNavigate, Link } from "react-router-dom"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 

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

function makeid(length) {
  var result           = '';
  var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const email = "legado9842@themesw.com" //makeid(5)+"@neo-discord.com"
const password = makeid(10)+"neo-discord"
const auth = getAuth();

async function document() {
  const db = getFirestore(app);
  const user = auth.currentUser;
  const uid = user.uid;
  await setDoc(doc(db, "user", uid), {
    email: email,
    password: password,
    uid: uid
  });
}

function Welcome() {

  const navigate = useNavigate();
  const auth = getAuth();

  function create() {
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
          <h1>Neo Discord</h1>
          &nbsp;
          <button onClick={create}>Open Neo Discord in your browser</button>
          &nbsp;
          <Link className="App-link" to="/login"> Login with existing account </Link>
      </header>
    </div>
  );
}
export default Welcome;