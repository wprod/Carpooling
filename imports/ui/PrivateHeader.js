import React from 'react';
import {Accounts} from 'meteor/accounts-base';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="privateHeader">
            <h1><a href="/covoits">{props.title}</a></h1>
            <a className="link" href="/" onClick={() => Accounts.logout()}>Logout</a>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;