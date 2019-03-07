import { createStore, combineReducers } from 'redux';
import { userReducer } from './services/user/user.reducer';

const combinedReducers = combineReducers({
    user: userReducer,
});

export default (initialState = {}) =>
    createStore(combinedReducers, initialState);
