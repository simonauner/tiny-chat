import React, { Component } from 'preact-compat';
import { Switch, Route, Link } from 'react-router-dom';
import Home from '../home/home.component';
import ChatRoom from '../chat-room/chat-room.component';

export default class Layout extends Component {
    render() {
        return (
            <div>
                <div pam-menu="">
                    <ul pam-menu-list="">
                        <li pam-menu-item="">
                            <Link pam-menu-link="" to="/">
                                Home
                            </Link>
                        </li>
                    </ul>
                </div>
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route
                        exact
                        path="/chat/:chatRoomId"
                        component={ChatRoom}
                    />
                </Switch>
            </div>
        );
    }
}
