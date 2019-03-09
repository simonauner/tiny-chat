import React, { Component } from 'preact-compat';

export default class ShareButton extends Component {
    constructor() {
        super();

        // bind ui functions
        this.share = this.share.bind(this);

        this.setState({ supported: !!navigator.share });
    }

    share() {
        navigator.share({
            title: 'Tiny chat',
            text: 'Join me on Tiny chat!',
            url: 'https://tiny-chat-e8708.firebaseapp.com/',
        });
    }

    render() {
        if (this.state.supported) {
            return (
                <span {...this.props} onClick={this.share}>
                    Invite a friend!
                </span>
            );
        }
        return null;
    }
}
