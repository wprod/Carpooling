import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import {Meteor} from 'meteor/meteor';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="privateHeader">
            <h1><a href="/covoits">{props.title}</a></h1>
            <a className="link" href="/" onClick={() => Accounts.logout()}>Logout</a>
            <a className="link admin" href={'/user/' + Meteor.userId() + '/admin'}>Your flights</a>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;