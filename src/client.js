import React from 'preact-compat';
import ReactDom from 'preact-compat';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';
import { initializeApp } from 'firebase/app';

import Layout from './components/layout/layout.component';
import createStore from './store';

const store = createStore();

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
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
