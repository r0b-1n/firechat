import { Link } from "react-router-dom"
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from './App';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

function Password() {

  var email = "legado9842@themesw.com"

  const triggerResetEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    console.log("Password reset email sent to " + email)
    cookies.remove('email')
    cookies.remove('password')
    cookies.remove('username')
    cookies.remove('uid')
  }

    return (
      <div className="Contact">
        <header className="App-header">
        <h1 className="password">Passwort zurücksetzen</h1>
        <input type="text" placeholder="E-Mail"/>
        &nbsp;
        <button className="button-password"  onClick={triggerResetEmail}>Zurücksetzen</button>
        &nbsp;
        <Link className="App-link" to="/login"> Wieder ans Passwort erinnert? </Link>
        &nbsp;
        <Link className="App-link" to="/"> Noch keinen Account? </Link>
        </header>
      </div>
    );
  }
  
  export default Password;