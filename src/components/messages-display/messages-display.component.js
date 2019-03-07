import React, { Component } from 'preact-compat';
import firebase from 'firebase/app';
import 'firebase/database';

export default class MessagesDisplay extends Component {
    constructor(props) {
        super(props);
        this.roomId = props.roomId;
        this.db = firebase.database();
        this.messagesRef = this.db.ref(`/messages/${this.roomId}/`);

        this.messagesRef.once('value').then(snapshot => {
            this.setState({
                messages: snapshot.val(),
            });
        });
    }

    componentDidMount() {
        this.messagesRef.on('value', snapshot => {
            this.setState({
                messages: snapshot.val(),
            });
        });
    }

    render() {
        if (!this.state.messages) {
            return null;
        }
        return (
            <div>
                {Object.keys(this.state.messages).map(key => {
                    const msg = this.state.messages[key];
                    const time = new Date(msg.timestamp);
                    return (
                        <div key={key}>
                            <div>
                                <strong>{msg.name}</strong>
                                &nbsp;
                                {time.toLocaleTimeString()}
                            </div>
                            {msg.message}
                        </div>
                    );
                })}
            </div>
        );
    }
}
