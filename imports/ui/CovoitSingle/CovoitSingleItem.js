import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export default class CovoitsListItems extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="covoitSingle">
                <h3>{this.props.from}→{this.props.to}</h3>
                <p>{this
                        .props
                        .active
                        .toString()}</p>
                <em>Places avalible : {this.props.availablePlaces}</em>
                <p>{this.props.comments}</p>
            </div>
        );
    }
};

CovoitsListItems.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    availablePlaces: PropTypes.number.isRequired,
    comments: PropTypes.string.isRequired,
    active: PropTypes.bool.isRequired
}