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
                <div className="header">
                    <span className="label">{this.props.active ? "Active" : "Disabeled" }</span><br/>
                    <h3>{this.props.from}→{this.props.to}</h3>
                </div>
                <em>Places avalible : <span className="puce">{this.props.availablePlaces}</span></em><br/>
                <em>Price : <span className="puce orange">{this.props.price}</span> €</em>
                <p>{this.props.comments}</p>
                <a className="link display" href={'/travels/' + this.props.covoitId}>Visit travel page</a>
                <a className="link admin" href={'/travels/' + this.props.covoitId + '/admin'}>Administration</a>
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