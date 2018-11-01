import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';
import {Link} from 'react-router-dom';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(this.state.credentials);
    const { name, value } = e.target;
    const credentials = { ...this.state.credentials, [name]: value };
    const errors = { ...this.state.errors, [name]: '' };
    if(e.target.name === 'username') {
      Object.assign(credentials, { profile_image: `https://api.adorable.io/avatars/285/${value}.png` });
    }

    this.setState({
      credentials,
      errors
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/register', this.state.credentials)
      .then( res => {
        Auth.setToken(res.data.token);
        Flash.setMessage('success', 'Account created!');
        this.props.history.push('/');
      })
      .catch(err => this.setState({ errors: err.response.data.error }))
      .then(() => console.log(this.state));

  }

  render() {
    return (
      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <div className="columns">
              <div className="column box">
                {/* Second column */}
                <h1 className="title is-1 has-text-centered">Register</h1>
                <div className="level">
                  <div className="level-item">
                    <figure className="image profile-picture is-128x128">
                      {!this.state.credentials.profile_image ? <img src='./assets/images/person-placeholder.jpg' /> : <img src={this.state.credentials.profile_image} />}
                    </figure>
                  </div>
                </div>
                <p className="has-text-centered">Create a Tippled account and see which drinks you can make with the ingredients you have at hand.</p>

                <div className="columns field is-mobile">
                  <div className="column is-one-quarter">
                    <label className="label">Name</label>
                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}
                    <div className="control">
                      <input
                        className={`input ${this.state.errors.username ? 'is-danger' : ''} `}
                        name="username"
                        placeholder="Name"
                        onChange={this.handleChange}
                      />
                    </div>
                  </div>
                  {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
                </div>


                <div className="columns field is-mobile">
                  <div className="column is-one-quarter">

                    <label className="label">Email</label>

                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}

                    <div className="control">
                      <input
                        className={`input ${this.state.errors.email ? 'is-danger' : ''} `}
                        name="email"
                        placeholder="Email"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}

                  </div>
                </div>

                <div className="columns field is-mobile">
                  <div className="column is-one-quarter">

                    <label className="label">Password</label>

                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}

                    <div className="control">
                      <input
                        className={`input ${this.state.errors.password ? 'is-danger' : ''} `}
                        name="password"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}

                  </div>
                </div>

                <div className="columns field is-mobile">
                  <div className="column is-one-quarter">

                    <label className="label">Confirmation Password</label>

                  </div>
                  <div className="column primary">
                    {/* Second SUBcolumn */}

                    <div className="control">
                      <input
                        className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''} `}
                        name="password_confirmation"
                        type="password"
                        placeholder="Password"
                        onChange={this.handleChange}
                      />
                    </div>
                    {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}

                  </div>
                </div>


                <div className="control">
                  <div className="level control">
                    <div className="level-item">
                      <button className="button">Register</button>
                    </div>
                  </div>
                </div>

              </div>
              <div className="column is-two-fifths">

                {/* First column */}

                <div className="vertical-flex">
                  <div className="box secondary">
                    <p className="has-text-centered">If you already have a Tippled account, please sign in.</p>
                    <div className="control">
                      <div className="level control">
                        <div className="level-item">
                          <Link to="/login">
                            <button className="button">Sign in</button>
                          </Link>

                        </div>
                      </div>
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

export default Register;
