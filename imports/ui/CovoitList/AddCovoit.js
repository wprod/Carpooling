import React from 'react';
import {Meteor} from 'meteor/meteor';

export default class AddCovoit extends React.Component {
    onSubmit(e) {
        e.preventDefault();
        const date = this.refs.date.value.trim();
        const from = this.refs.from.value.trim();
        const to = this.refs.to.value.trim();
        const availablePlaces = this.refs.availablePlaces.value;
        const comments = this.refs.comments.value.trim();
        const price = this.refs.price.value.trim();

        //Calling our secured method to add data to db :
        Meteor.call('covoits.insert', date, from, to, availablePlaces, comments, price);

        this.refs.date.value = "";
        this.refs.from.value = "";
        this.refs.to.value = "";
        this.refs.availablePlaces.value = "";
        this.refs.comments.value = "";
    }
    render() {
        return (
            <div className="addCovoit">
                <form onSubmit={this
                    .onSubmit
                    .bind(this)}>
                    <h2>Add a flight :</h2>
                    <label>
                        Date :
                        <input type="date" ref="date" placeholder="When"/>
                    </label>
                    <label>
                        From :
                        <input type="text" ref="from" placeholder="From"/>
                    </label>
                    <label>
                        To :
                        <input type="text" ref="to" placeholder="To"/>
                    </label>
                    <label>
                        Avalible places :
                        <input type="number" ref="availablePlaces" placeholder="Avalible places"/>
                    </label>
                    <label>
                        Price :
                        <input type="number" ref="price" placeholder="Price"/>
                    </label>
                    <label>
                        Comments :
                        <textarea ref="comments"></textarea>
                    </label>
                    <button>Add travel</button>
                </form>
            </div>
        );
    }
}
