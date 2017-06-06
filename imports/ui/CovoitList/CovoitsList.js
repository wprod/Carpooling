import React from "react";
import {Meteor} from 'meteor/meteor';
import {Tracker} from 'meteor/tracker';
import FlipMove from 'react-flip-move';

import {Covoits} from '../../api/covoits';
import CovoitsListItem from './CovoitsListItem';

export default class CovoitsList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            covoits:[]
        }
    };

    componentDidMount(){
        console.log("componentDidMount from covoit page");
        this.CovoitsTracker = Tracker.autorun(() => {
            Meteor.subscribe('covoits');
            const covoits = Covoits.find().fetch();
            this.setState({covoits});
        });
    };

    componentWillUnmount(){
        console.log("componentWillUnmount from covoit page")
        this.CovoitsTracker.stop();
    };

    renderCovoitsListItems() {
        return this.state.covoits.map( (covoit) => {
            return (
                <CovoitsListItem 
                userId={covoit.userId}
                covoitId={covoit._id} 
                key={covoit._id} 
                from={covoit.from} 
                to={covoit.to} 
                availablePlaces={covoit.availablePlaces} 
                comments={covoit.comments}
                active= {covoit.active}/>
            );
        })
    };

    render(){
        return(
            <FlipMove>
                <div className="covoitList">
                    {this.renderCovoitsListItems()}
                </div>
            </FlipMove>
        );
    };
}