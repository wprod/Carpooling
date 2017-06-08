import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Covoits} from './../../api/covoits';
import PrivateHeader from './../PrivateHeader';
import CovoitSingleAdminItem from './CovoitSingleAdminItem';

export default class CovoitSingle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covoits: []
        }
    };
    componentDidMount() {
        console.log("componentDidMount from covoit page");
        this.CovoitsTracker = Tracker.autorun(() => {
            Meteor.subscribe('covoits');
            const covoits = Covoits
                .find({_id: this.props.params.id})
                .fetch();
            this.setState({covoits});
        });
    };
    componentWillUnmount() {
        console.log("componentWillUnmount from covoit page")
        this
            .CovoitsTracker
            .stop();
    };
    renderCovoitsListItems() {
        return this
            .state
            .covoits
            .map((covoit) => {
                return (<CovoitSingleAdminItem
                    userId={covoit.userId}
                    covoitId={covoit._id}
                    date={covoit.date}
                    key={covoit._id}
                    from={covoit.from}
                    to={covoit.to}
                    price={covoit.price}
                    availablePlaces={covoit.availablePlaces}
                    comments={covoit.comments}
                    active={covoit.active}/>);
            })
    };
    render() {
        return (
            <div>
                <PrivateHeader title="Admin"/>
                <div>
                    {this.renderCovoitsListItems()}
                </div>
            </div>
        );
    };
}