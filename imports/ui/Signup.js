import React from 'react';
import { Link } from 'react-router';
import { Accounts } from 'meteor/accounts-base';

export default class Signup extends React.Component {
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

    if (password.length < 6){
      return this.setState({
        feedback: "Password must be longer than 6 char."
      })
    }

    Accounts.createUser({email, password}, (err) => {
      console.log('Signup callback', err);
      err ? this.setState({feedback: err.reason}) : this.setState({feedback: 'Worked'}) 
    });
  }
  render() {
    return (
      <div className="signUp">
        <h1>Register</h1>

        {this.state.feedback ? <p>{this.state.feedback}</p> : undefined}

        <form onSubmit={this.onSubmit.bind(this)}>
          <input type="email" ref="email" name="email" placeholder="Email"/>
          <input type="password" ref="password" name="password" placeholder="Password"/>
          <button>Create Account</button>
        </form>

        <Link to="/">Already have an account ?</Link>
      </div>
    );
  }
}
