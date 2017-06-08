import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';

import {Covoits} from './../../api/covoits';
import PrivateHeader from './../PrivateHeader';
import CovoitSingleItem from './CovoitSingleItem';
import ChatBox from './../Chat/ChatBox';

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
                return (<CovoitSingleItem
                    userId={covoit.userId}
                    covoitId={covoit._id}
                    covoitId={covoit.date}
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
                <PrivateHeader title="Your travel"/>
                <a className="back" href="/covoits">Back to the list</a>
                <div>
                    {this.renderCovoitsListItems()}
                </div>
                <ChatBox id={this.props.params.id}/>
            </div>
        );
    };
}