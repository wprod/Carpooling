import React from "react";
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import {Covoits} from '../../api/covoits';
import CovoitsListItem from './CovoitsListItem';
import SearchBox from './SerachBox'

export default class CovoitsList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            covoits: [],
            from:"",
            to:""
        }
        this.handleChangeFrom = this.handleChangeFrom.bind(this);
        this.handleChangeTo = this.handleChangeTo.bind(this);
    };
    componentDidMount() {
        console.log("componentDidMount from covoit page");
        this.CovoitsTracker = Tracker.autorun(() => {
            Meteor.subscribe('covoits');
            const covoits = Covoits
                .find()
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
                if (covoit
                .from
                .toLowerCase()
                .trim()
                .startsWith(this.state.from) 
                && 
                covoit.to
                .toLowerCase()
                .trim()
                .startsWith(this.state.to)) {

                return (<CovoitsListItem
                    userId={covoit.userId}
                    covoitId={covoit._id}
                    key={covoit._id}
                    from={covoit.from}
                    to={covoit.to}
                    availablePlaces={covoit.availablePlaces}
                    comments={covoit.comments}
                    active={covoit.active}/>);
                    
                };
            })
    };

    handleChangeFrom(val){
        this.setState({from: val});
        console.log("From : ", this.state.from);

    };

    handleChangeTo(val){
        this.setState({to: val});
        console.log("To : ", this.state.to);

    }

    render() {
        return (
            <div>
                <SearchBox handleChangeFrom={this.handleChangeFrom} handleChangeTo={this.handleChangeTo} />
                <FlipMove className="covoitList">
                    {this.renderCovoitsListItems()}
                </FlipMove>
            </div>
        );
    };
}