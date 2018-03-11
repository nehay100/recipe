import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import App from './App';    
import registerServiceWorker from './registerServiceWorker';
import firebase from 'firebase';

// Initialize Firebase
let config = {
    apiKey: "AIzaSyCLKXGKgobCL3wnD9YAXlI30EcZBPnGgwc",
    authDomain: "recipe-8f6ec.firebaseapp.com",
    databaseURL: "https://recipe-8f6ec.firebaseio.com",
    projectId: "recipe-8f6ec",
    storageBucket: "recipe-8f6ec.appspot.com",
    messagingSenderId: "511679998832"
};

firebase.initializeApp(config);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
