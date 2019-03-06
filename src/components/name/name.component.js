import React, { Component } from 'preact-compat';
const localStorageNameKey = 'tiny-chat_username';

export default class Name extends Component {
    constructor() {
        super();

        this.setState({
            name: window.localStorage.getItem(localStorageNameKey),
            returning: !!window.localStorage.getItem(localStorageNameKey),
        });

        this.forgetMe = this.forgetMe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    forgetMe() {
        window.localStorage.removeItem(localStorageNameKey);
        this.setState({ name: null, returning: false });
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        this.setState({ name: data.get('name') });
        window.localStorage.setItem(localStorageNameKey, this.state.name);
    }

    getWelcomeMessage() {
        const msg = this.state.returning ? 'Welcome back' : 'Good to go';
        return (
            <div>
                {msg} {this.state.name}{' '}
                <button onClick={this.forgetMe}>Forget me</button>
            </div>
        );
    }

    getInputForm() {
        return (
            <div>
                <p>Welcome! Please enter a name to start chatting!</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" id="name" required />
                    <button>Save</button>
                </form>
            </div>
        );
    }

    render() {
        return this.state.name ? this.getWelcomeMessage() : this.getInputForm();
    }
}
