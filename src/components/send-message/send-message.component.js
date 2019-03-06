import React, { Component } from 'preact-compat';
import { database } from 'firebase';

export default class SendMessage extends Component {
    constructor(props) {
        super(props);

        this.roomId = props.roomId;
        this.db = database();
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(
            `will store message "${data.get('message')}" in room id ${
                this.roomId
            }`
        );

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
                console.log(`message sent: ${data.get('message')}`);
            }
        );

        // set latest posted message for channel
        this.db.ref(`/chatrooms/${this.roomId}/lastpost`).update({
            name: window.localStorage.getItem('tiny-chat_username'),
            timestamp: Date.now(),
        });
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="message" id="message" required />
                    <button>Send</button>
                </form>
            </div>
        );
    }
}
