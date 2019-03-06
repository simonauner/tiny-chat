import React, { Component } from 'preact-compat';
import { Link } from 'react-router-dom';
import { database } from 'firebase';
import Name from '../name/name.component';
import CreateChatRoom from '../create-chat-room/create-chat-room.component';

const localStorageNameKey = 'tiny-chat_username';

export default class Home extends Component {
    constructor() {
        super();

        const db = database();
        db.ref('chatrooms')
            .once('value')
            .then(snapshot => {
                this.setState({
                    rooms: snapshot.val(),
                });
            });
    }

    getRoomList() {
        if (!this.state.rooms) {
            return <div />;
        }

        return (
            <ul>
                {Object.keys(this.state.rooms).map(key => {
                    const roomName = this.state.rooms[key].name;
                    const url = `/chat/${key}`;
                    const lastPostData = this.state.rooms[key].lastpost;
                    let lastPost = null;
                    if (lastPostData) {
                        const time = new Date(lastPostData.timestamp);
                        lastPost = (
                            <span>
                                ({lastPostData.name},{' '}
                                {time.toLocaleTimeString()})
                            </span>
                        );
                    }
                    return (
                        <li key={key}>
                            <Link to={url}>{roomName}</Link> {lastPost}
                        </li>
                    );
                })}
            </ul>
        );
    }

    render() {
        return (
            <div>
                <Name />
                <CreateChatRoom />
                {this.getRoomList()}
            </div>
        );
    }
}
