import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export default class Message extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div>
                <p className="name">{this.props.email}</p>
                <em className="message">{this.props.message}</em>
            </div>
        );
    }
};