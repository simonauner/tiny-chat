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

        // bind ui functions
        this.orderAlphabetically = this.orderAlphabetically.bind(this);
        this.orderByLastPost = this.orderByLastPost.bind(this);

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
    }

    fetchChatRooms() {
        const db = firebase.database().ref('chatrooms');
        let orderedRooms = [];

        if (this.state.orderByLastPost) {
            db.orderByChild('lastpost/timestamp')
                .once('value')
                .then(snapshot => {
                    let orderedRooms = [];
                    snapshot.forEach(s => {
                        orderedRooms.push({ key: s.key, val: s.val() });
                        // return false, otherwise forEach is cancelled
                        return false;
                    });
                    orderedRooms = orderedRooms.reverse();
                    this.setState({
                        rooms: orderedRooms,
                        loading: false,
                    });
                });
        } else {
            db.orderByChild('name')
                .once('value')
                .then(snapshot => {
                    snapshot.forEach(s => {
                        orderedRooms.push({ key: s.key, val: s.val() });
                        // return false, otherwise forEach is cancelled
                        return false;
                    });
                    this.setState({
                        rooms: orderedRooms,
                        loading: false,
                    });
                });
        }
    }

    orderAlphabetically() {
        this.setState({
            orderByLastPost: false,
        });
    }

    orderByLastPost() {
        this.setState({
            orderByLastPost: true,
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
                <div sort-options="">
                    <a
                        pam-link=""
                        onClick={this.orderAlphabetically}
                        selected={!this.state.orderByLastPost}
                    >
                        Sort alphabetically
                    </a>{' '}
                    |{' '}
                    <nobr>
                        <a
                            pam-link=""
                            onClick={this.orderByLastPost}
                            selected={this.state.orderByLastPost}
                        >
                            Sort by last post
                        </a>
                    </nobr>
                </div>
                <ul chatroom-list="">
                    {this.state.rooms.map(room => {
                        const lastPostData = room.val.lastpost;
                        let lastPost = null;
                        if (lastPostData) {
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
                            <li key={room.key}>
                                <Link pam-link="" to={'/chat/' + room.key}>
                                    {room.val.name}
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
        if (this.props.name) {
            this.fetchChatRooms();
        }

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
