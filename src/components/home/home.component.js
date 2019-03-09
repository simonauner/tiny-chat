import React, { Component } from 'preact-compat';
import { Link } from 'react-router-dom';
import firebase from 'firebase/app';
import 'firebase/database';
import { connect } from 'preact-redux';

// Components
import Name from '../name/name.component';
import CreateChatRoom from '../create-chat-room/create-chat-room.component';

// Services
import { getUserFromLocalStorage } from '../../services/user/user.service';
import { setUserAction } from '../../services/user/user.actions';
import { humanReadableTimeDistanceFuzzy } from '../../services/time/time.service';

class Home extends Component {
    constructor(props) {
        super(props);

        this.setState({
            loading: true,
        });

        // initialise user data
        const name = getUserFromLocalStorage();
        if (name) {
            this.props.setUserAction({
                name,
                returning: true,
            });
        }

        this.fetchChatRooms();
    }

    fetchChatRooms() {
        const db = firebase.database();
        db.ref('chatrooms')
            .once('value')
            .then(snapshot => {
                this.setState({
                    rooms: snapshot.val(),
                    loading: false,
                });
            });
    }

    getRoomList() {
        if (this.state.loading) {
            return <div>Loading chat rooms...</div>;
        }

        if (!this.state.rooms) {
            return <div />;
        }

        return (
            <div>
                <h2>Join an existing chat room</h2>
                <ul chatroom-list="">
                    {Object.keys(this.state.rooms).map(key => {
                        const roomName = this.state.rooms[key].name;
                        const url = `/chat/${key}`;
                        const lastPostData = this.state.rooms[key].lastpost;
                        let lastPost = null;
                        if (lastPostData) {
                            // const time = new Date(lastPostData.timestamp);
                            lastPost = (
                                <span last-post="">
                                    (last activity by {lastPostData.name},{' '}
                                    {humanReadableTimeDistanceFuzzy(
                                        lastPostData.timestamp
                                    )}
                                    )
                                </span>
                            );
                        }
                        return (
                            <li key={key}>
                                <Link pam-link="" to={url}>
                                    {roomName}
                                </Link>{' '}
                                {lastPost}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }

    getSignedInContent() {
        if (!this.props.name) {
            return null;
        }
        return (
            <div pam-alert="info" margined-box="">
                {this.getRoomList()}
                <CreateChatRoom
                    roomsExist={!!this.state.rooms}
                    loading={this.state.loading}
                />
            </div>
        );
    }

    render() {
        return (
            <div>
                <Name />
                {this.getSignedInContent()}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return { ...state.user };
};

export default connect(
    mapStateToProps,
    {
        setUserAction: setUserAction,
    }
)(Home);
