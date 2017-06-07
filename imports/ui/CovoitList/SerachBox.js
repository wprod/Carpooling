import React from 'react';
import {Meteor} from 'meteor/meteor';

export default class SearchBox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            from: '',
            to: ''
        };
    }
    handleChangeFrom(event) {
        this.setState({from: event.target.value});
        this.props.handleChangeFrom(this.state.from);
    }
    handleChangeTo(event) {
        this.setState({to: event.target.value});
        this.props.handleChangeTo(this.state.to);
    }
    render() {
        return (
            <div id="searchBox">
                <div>
                    <h2>From :</h2>
                    <input
                        type="text"
                        value={this.state.from}
                        onChange={this
                        .handleChangeFrom
                        .bind(this)}/>
                </div>
                <div>
                    <h2>To :</h2>
                    <input
                        type="text"
                        value={this.state.to}
                        onChange={this
                        .handleChangeTo
                        .bind(this)}/>
                </div>
            </div>
        );
    };
}