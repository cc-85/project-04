import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

class Login extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, errors: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/login', this.state.credentials)
      .then(res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('success', 'Welcome back!');
        this.props.history.push('/');
      })
      .catch(() => this.setState({errors: 'Invalid credentials'}));
  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <h1 className="title is-1">Login page</h1>
          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email" onChange={this.handleChange}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors ? 'is-danger' : ''} `}
                  name="password"
                  placeholder="Password"
                  type="password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.state.errors && <small className="help is-danger">{this.state.errors}</small>}

            <button className="button is-primary">Submit</button>

          </form>
        </div>
      </main>
    );
  }
}

export default Login;
