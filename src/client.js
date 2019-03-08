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

ReactDom.render(
    <Provider store={store}>
        <BrowserRouter>
            <Layout />
        </BrowserRouter>
    </Provider>,
    document.getElementById('app')
);
