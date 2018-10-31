import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';
import Flash from '../lib/Flash';

class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: {} };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    console.log(this.state.credentials);
    const { name, value } = e.target;
    const credentials = { ...this.state.credentials, [name]: value };
    //if(e.target.name === 'username' && !credentials.profile_image) {
    if(e.target.name === 'username') {
      Object.assign(credentials, { profile_image: `https://api.adorable.io/avatars/285/${value}.png` });
    }

    this.setState({
      credentials,
      error: ''
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
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (

      <main className="section">
        <div className="container">
          <h1 className="title is-1">Register page</h1>

          {/* {this.state.credentials.profile_image && <figure className="image profile-picture is-128x128">
            <img src={this.state.credentials.profile_image} />
          </figure>} */}

          <figure className="image profile-picture is-128x128">
            {!this.state.credentials.profile_image ? <img src='./assets/images/person-placeholder.jpg' /> : <img src={this.state.credentials.profile_image} />}
          </figure>

          <form onSubmit={this.handleSubmit}>
            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="username"
                  placeholder="Name"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                />
              </div>
            </div>



            {/* <div className="field">
              <label className="label">Profile image</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="profile_image"
                  placeholder="Image URL"
                  onChange={this.handleChange}
                />
              </div>
            </div> */}
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="password"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirmation Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="password_confirmation"
                  type="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                />
              </div>
            </div>
            {this.state.error && <small className="help is-danger">{this.state.error}</small>}

            <button className="button is-primary">Submit</button>

          </form>
        </div>
      </main>

    );
  }
}

export default Register;
