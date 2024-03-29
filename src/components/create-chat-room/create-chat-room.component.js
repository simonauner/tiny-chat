import React, { Component } from 'preact-compat';
import firebase from 'firebase/app';
import 'firebase/database';

export default class CreateChatRoom extends Component {
    constructor() {
        super();
        this.db = firebase.database();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);

        // create room in firebase
        const roomsRef = this.db.ref('/chatrooms');
        const newRoom = roomsRef.push();
        const key = newRoom.key;
        newRoom.set(
            {
                name: data.get('name'),
            },
            () => {
                window.location = `/chat/${key}`;
            }
        );
    }

    render() {
        if (this.props.loading) {
            return <div />;
        }
        return (
            <div>
                {this.props.roomsExist ? (
                    <h2>...or create a new one</h2>
                ) : (
                    <h2>Be the first one to create a chat room!</h2>
                )}
                <form pam-form="" onSubmit={this.onSubmit}>
                    <input type="text" name="name" id="name" required />
                    <input type="submit" pam-button="primary" value="Go!" />
                </form>
            </div>
        );
    }
}
