import React, { Component } from 'preact-compat';
import { database } from 'firebase';

export default class CreateChatRoom extends Component {
    constructor() {
        super();
        this.db = database();

        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        console.log(data.get('name'));

        // create room in firebase
        const roomsRef = this.db.ref('/chatrooms');
        const newRoom = roomsRef.push();
        const key = newRoom.key;
        newRoom.set(
            {
                name: data.get('name'),
            },
            () => {
                // go to the chat room
                console.log(`go to ${data.get('name')}`);
                window.location = `/chat/${key}`;
            }
        );
    }

    render() {
        return (
            <div>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" id="name" required />
                    <button>Create room</button>
                </form>
            </div>
        );
    }
}
