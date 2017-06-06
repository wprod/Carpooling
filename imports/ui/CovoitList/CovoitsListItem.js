import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export default class CovoitsListItems extends React.Component {
    constructor(props) {
        super(props);
    };

    render() {
        return (
            <div className="link covoit">
                <h3>{this.props.from}→{this.props.to}</h3>
                <p>{this
                        .props
                        .active
                        .toString()}</p>
                <em>Places avalible : {this.props.availablePlaces}</em>
                <p>{this.props.comments}</p>
                <a className="link display" href={'/travels/' + this.props.covoitId}>Visit travel page</a>
                {Meteor.userId() != this.props.userId
                    ? (
                        <span></span>
                    )
                    : (
                        <a className="link admin" href={'/travels/' + this.props.covoitId}>Administration</a>
                    )
}

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