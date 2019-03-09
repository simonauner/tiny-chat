import React, { Component } from 'preact-compat';
import firebase from 'firebase/app';
import 'firebase/database';
import { humanReadableTimeDistanceExact } from '../../services/time/time.service';

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
            <div pam-alert="" messages-display="">
                {Object.keys(this.state.messages).map(key => {
                    const msg = this.state.messages[key];
                    return (
                        <div msg="" key={key}>
                            <div>
                                <strong msg-name="">{msg.name}</strong>
                                &nbsp;
                                <span msg-time="">
                                    {humanReadableTimeDistanceExact(
                                        msg.timestamp
                                    )}
                                </span>
                            </div>
                            <div msg-content="">{msg.message}</div>
                        </div>
                    );
                })}
            </div>
        );
    }
}
