import React, { Component } from 'preact-compat';
import MessagesDisplay from '../messages-display/messages-display.component';
import SendMessage from '../send-message/send-message.component';

export default class ChatRoom extends Component {
    render(props) {
        return (
            <div>
                <MessagesDisplay roomId={props.match.params.chatRoomId} />
                <SendMessage roomId={props.match.params.chatRoomId} />
            </div>
        );
    }
}
