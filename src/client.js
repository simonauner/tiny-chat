import React from 'preact-compat';
import ReactDom from 'preact-compat';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'preact-redux';
import firebase from 'firebase/app';

import Layout from './components/layout/layout.component';
import createStore from './store';

import firebaseConfig from '../firebase.config';

const store = createStore();

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// --------------------------------------------
// Hack to get viewport 100% on mobile devices
// thanks to https://css-tricks.com/the-trick-to-viewport-units-on-mobile/

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty('--vh', `${vh}px`);
// --------------------------------------------

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
