import React from 'preact-compat';
import ReactDom from 'preact-compat';
import { BrowserRouter } from 'react-router-dom';
import Layout from './components/layout/layout.component';
import { initializeApp } from 'firebase/app';

// Initialize Firebase
var config = {
    apiKey: 'AIzaSyDHvAJdBJNi21vZcl5yf7wnJHanRw0iPc4',
    authDomain: 'tiny-chat-e8708.firebaseapp.com',
    databaseURL: 'https://tiny-chat-e8708.firebaseio.com',
    projectId: 'tiny-chat-e8708',
    storageBucket: 'tiny-chat-e8708.appspot.com',
    messagingSenderId: '281909622275',
};
initializeApp(config);

ReactDom.render(
    <BrowserRouter>
        <Layout />
    </BrowserRouter>,
    document.getElementById('app')
);
