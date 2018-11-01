import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';
import { Link } from 'react-router-dom';

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

          <form onSubmit={this.handleSubmit}>

            <div className="columns">
              <div className="column is-two-fifths">

                {/* First column */}

                <div className="vertical-flex">
                  <div className="box secondary">
                    <p className="has-text-centered">If you don't have a Tippled account, please register</p>
                    <div className="control">
                      <div className="level control">
                        <div className="level-item">
                          <Link to="/register">
                            <button className="button">Register</button>
                          </Link>

                        </div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              <div className="column box">
                {/* Second column */}

                <h1 className="title is-1 has-text-centered">Sign in</h1>

                <div className="columns">
                  <div className="column is-one-quarter">

                    <label className="label">Email</label>

                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}

                    <div className="control">
                      <input
                        className={`input ${this.state.errors ? 'is-danger' : ''} `}
                        name="email"
                        placeholder="Email" onChange={this.handleChange}
                      />
                    </div>

                  </div>
                </div>

                <div className="columns">
                  <div className="column is-one-quarter">
                    {/* First SUBcolumn */}

                    <label className="label">Password</label>

                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}

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


                </div>

                <div className="control">
                  <div className="level control">
                    <div className="level-item">
                      <button className="button">Sign in</button>
                    </div>
                  </div>
                </div>

              </div>
            </div>



          </form>
        </div>
      </main>
    );
  }
}

export default Login;
