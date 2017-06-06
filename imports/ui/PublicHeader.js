import React from 'react';
import PropTypes from 'prop-types';

const PrivateHeader = (props) => {
    return (
        <div className="privateHeader">
            <h1>{props.title}</h1>
        </div>
    );
}

PrivateHeader.propTypes = {
    title: PropTypes.string.isRequired
}

export default PrivateHeader;