import { useNavigate, Link } from "react-router-dom"
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; 
import { db, auth } from './App';


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

async function document() {
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

  function CreateNewUser() {
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
          <button onClick={CreateNewUser}>Open Neo Discord in your browser</button>
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