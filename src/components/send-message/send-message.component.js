import React, { Component } from 'preact-compat';
import firebase from 'firebase/app';
import 'firebase/database';

export default class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.roomId = props.roomId;
        this.db = firebase.database();
        this.onSubmit = this.onSubmit.bind(this);

        this.db
            .ref(`/chatrooms/${this.roomId}/`)
            .once('value')
            .then(snapshot => {
                this.setState({
                    name: snapshot.val().name,
                });
            });
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // send new message to the chat
        const messageRef = this.db.ref(`/messages/${this.roomId}/`);
        const newMsg = messageRef.push();
        newMsg.set(
            {
                name: window.localStorage.getItem('tiny-chat_username'),
                message: data.get('message'),
                timestamp: Date.now(),
            },
            () => {
                event.target.elements.message.value = '';
            }
        );

        // set latest posted message for channel
        this.db.ref(`/chatrooms/${this.roomId}/lastpost`).update({
            name: window.localStorage.getItem('tiny-chat_username'),
            timestamp: Date.now(),
        });
    }

    render() {
        const placeholder = this.state.name ? `Message ${this.state.name}` : '';
        return (
            <div pam-alert="success">
                <form pam-form="" onSubmit={this.onSubmit}>
                    <input
                        placeholder={placeholder}
                        pam-form-width="1-1"
                        type="text"
                        name="message"
                        id="message"
                        required
                        autoComplete="off"
                    />
                </form>
            </div>
        );
    }
}
