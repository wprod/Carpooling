import React from 'react';
import {Meteor} from 'meteor/meteor';
import {Covoits} from './../../api/covoits';
import FlipMove from 'react-flip-move';

import Message from './Message';

export default class ChatBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covoits: []
        }
    };
    componentDidMount() {
        console.log("componentDidMount from chatbox page");
        this.CovoitsTracker = Tracker.autorun(() => {
            Meteor.subscribe('covoits');
            const covoits = Covoits
                .find({_id: this.props.id})
                .fetch();
            this.setState({covoits});
        });
    };
    componentWillUnmount() {
        console.log("componentWillUnmount from chatbox page")
        this
            .CovoitsTracker
            .stop();
    };
    renderCovoitsMessages() {
        return this
            .state
            .covoits
            .map((covoit) => {
                return (covoit.messages.map((sms, index) => {
                    return <Message key={index} email={sms[0]} message={sms[1]}/>;
                }));
            })
    };
    onSubmit(e) {
        e.preventDefault();
        const message = this
            .refs
            .message
            .value
            .trim();
        const id = this.props.id;
        Meteor.call('covoits.insertMessage', id, message);
        this.refs.message.value = "";
    }
    render() {
        return (
            <div>
                <h4>Lets chat !</h4>
                <FlipMove className="history">
                    {this.renderCovoitsMessages()}
                </FlipMove>
                <form
                    onSubmit={this
                    .onSubmit
                    .bind(this)}>
                    <input ref="message" type="text" placeholder="Your message"/>
                    <button>Send</button>
                </form>
                
            </div>
        );
    }
}