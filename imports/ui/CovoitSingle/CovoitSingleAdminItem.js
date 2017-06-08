import React from 'react';
import PropTypes from 'prop-types';
import {Meteor} from 'meteor/meteor';

export default class CovoitsListItems extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active:true
        };
        this.handleTrigger = this.handleTrigger.bind(this);
    };
    onSubmit(e) {
        e.preventDefault();
        const active = this.refs.active.value.trim();
        const date = this.refs.date.value.trim();
        const from = this.refs.from.value.trim();
        const to = this.refs.to.value.trim();
        const availablePlaces = this.refs.availablePlaces.value;
        const comments = this.refs.comments.value.trim();
        const price = this.refs.price.value.trim();

        console.log(this.props.userId);
        //Calling our secured method to add data to db :
        Meteor.call('covoits.update', this.state.active, date, from, to, availablePlaces, comments, price, this.props.userId, this.props.covoitId);
    };
    handleTrigger(e) {
        const target = e.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        this.setState({
            active:value
        });     
    }

    render() {
        return (
            <div className="covoitSingle">
                <div className="header">
                    {this.state.active
                        ? <span className="label">Active</span>
                        : <span className="label disabeled">Disabeled</span>}
                    <h3>{this.props.from}→{this.props.to}</h3>
                </div>
                
                <div className="modifyCovoit">
                    <form onSubmit={this
                        .onSubmit
                        .bind(this)}>
                        <label className="switch">
                            <input name="active" type="checkbox" defaultChecked={this.props.active} checked={this.state.value} ref="active" onChange={this.handleTrigger}/>
                            <div className="slider round"></div>
                           </label>
                        <label>
                            Date :
                            <input type="date" ref="date" placeholder="When"/>
                        </label>
                        <label>
                            From :
                            <input type="text" ref="from" placeholder="From" defaultValue={this.props.from}/>
                        </label>
                        <label>
                            To :
                            <input type="text" ref="to" placeholder="To" defaultValue={this.props.to}/>
                        </label>
                        <label>
                            Avalible places :
                            <input type="number" ref="availablePlaces" placeholder="Avalible places" defaultValue={this.props.availablePlaces}/>
                        </label>
                        <label>
                            Price :
                            <input type="number" ref="price" placeholder="price" defaultValue={this.props.price}/>
                        </label>
                        <label>
                            Comments :
                            <textarea ref="comments" defaultValue={this.props.comments}></textarea>
                        </label>
                        <button>Modify travel</button>
                    </form>
                </div>
            </div>
        );
    }
};

CovoitsListItems.propTypes = {
    from: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
    availablePlaces: PropTypes.number.isRequired,
    comments: PropTypes.string.isRequired,
}