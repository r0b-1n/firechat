import { appname } from './App';

function About() {
    return (
      <div className="About">
        <header className="App-header">
          <h1> What is {appname}?</h1>
          <p>{appname} is a chat app build with React, your Account and messages are saved on Googles Firebase and thewebsite is hosted with GitHub Pages!</p>
          <h1>Is it secure?</h1>
          <p>nope not at all</p>
          <h1>For technical interested - How does it work?</h1>
          <p>When you create an account you will get a random email and password. You can change your password if you want to.</p>
          <p>When you start a chat with someone a document will be created in our Firebase Firestore with the name of your and the receivers uid. After that every chat message will be stored there with the message's text, the uid of the creator and the time the message has been send.</p>
        </header>
      </div>
    );
  }
  
  export default About;