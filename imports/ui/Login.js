import React from 'react';
import { Link } from 'react-router';
import { Meteor } from 'meteor/meteor';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: ''
    };
  }
  onSubmit(e) {
    e.preventDefault();

    let email = this.refs.email.value.trim();
    let password = this.refs.password.value.trim();

    Meteor.loginWithPassword({email}, password, (err) => {
      console.log('Login callback', err);
      err ? this.setState({feedback: err.reason}) : this.setState({feedback: 'Worked'}) 
    });
  }
  render() {
    return (
      <div className="login">
        <h1>Login</h1>

        {this.state.feedback ? <p>{this.state.feedback}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Login</button>
        </form>

        <Link to="/signup">Create an account</Link>
      </div>
    );
  }
}
