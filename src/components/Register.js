import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: {}, errors: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(this.state.avatar);
    const { name, value } = e.target;
    const credentials = { ...this.state.credentials, [name]: value };
    const errors = { ...this.state.errors, [name]: '' };
    if(e.target.name === 'username' && !credentials.profile_image) {
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
            <h1 className="title is-1">Register page</h1>
            <div className="field">
              <label className="label">Name</label>
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

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}

            {this.state.credentials.profile_image && <figure className="image profile-picture is-128x128">
              <img src={this.state.credentials.profile_image} />
            </figure>}

            <div className="field">
              <label className="label">Profile image</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.profile_image ? 'is-danger' : ''} `}
                  name="profile_image"
                  placeholder="Image URL"
                  onChange={this.handleChange}
                  //value={this.state.profile_image || this.state.avatar}
                />
              </div>
            </div>
            {this.state.errors.profile_image && <small className="help is-danger">{this.state.errors.profile_image}</small>}

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.password ? 'is-danger' : ''} `}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.state.errors.password && <small className="help is-danger">{this.state.errors.password}</small>}

            <div className="field">
              <label className="label">Confirmation Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.password_confirmation ? 'is-danger' : ''} `}
                  name="password_confirmation"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.state.errors.password_confirmation && <small className="help is-danger">{this.state.errors.password_confirmation}</small>}

            <button className="button is-primary">Submit</button>

          </form>
        </div>
      </main>

    );
  }
}

export default Register;
