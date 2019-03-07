import React, { Component } from 'preact-compat';
import { connect } from 'preact-redux';
import {
    setUserAction,
    deleteUserAction,
} from '../../services/user/user.actions';
import {
    removeUserFromLocalStorage,
    setUserInLocalStorage,
} from '../../services/user/user.service';

class Name extends Component {
    constructor(props) {
        super(props);

        this.forgetMe = this.forgetMe.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    forgetMe() {
        removeUserFromLocalStorage();
        this.props.deleteUserAction();
    }

    onSubmit(event) {
        event.preventDefault();
        const data = new FormData(event.target);
        const name = data.get('name');

        setUserInLocalStorage(name);
        this.props.setUserAction({ name, returning: false });
    }

    getWelcomeMessage() {
        const msg = this.props.returning
            ? `Welcome back ${this.props.name}!`
            : `${this.props.name}, you're good to go!`;
        return (
            <div>
                {msg} <button onClick={this.forgetMe}>Forget me</button>
            </div>
        );
    }

    getInputForm() {
        return (
            <div>
                <p>Welcome! Please enter a name to start chatting!</p>
                <form onSubmit={this.onSubmit}>
                    <input type="text" name="name" id="name" required />
                    <button>Save</button>
                </form>
            </div>
        );
    }

    render() {
        return this.props.name ? this.getWelcomeMessage() : this.getInputForm();
    }
}

const mapStateToProps = state => {
    return { ...state.user };
};

export default connect(
    mapStateToProps,
    {
        setUserAction: setUserAction,
        deleteUserAction: deleteUserAction,
    }
)(Name);
