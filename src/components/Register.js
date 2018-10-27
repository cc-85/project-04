import React from 'react';
import axios from 'axios';
import Auth from '../lib/Auth';


class Register extends React.Component {
  constructor() {
    super();
    this.state = { credentials: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const credentials = { ...this.state.credentials, [e.target.name]: e.target.value };
    this.setState({ credentials, error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
    axios
      .post('/api/register', this.state.credentials)
      .then( res => {
        Auth.setToken(res.data.token);
        this.props.history.push('/');
      })
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    return (

    // id = db.Column(db.Integer, primary_key=True)
    // username = db.Column(db.String(20), nullable=False, unique=True)
    // email = db.Column(db.String(128), nullable=False, unique=True)
    // _password = db.Column(db.String(128))
    // profile_image = db.Column(db.String(128))


      <main className="section">
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h1 className="title is-1">Register page</h1>
            <div className="field">
              <label className="label">User Name</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="username" placeholder="User Name" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="password" type="password" placeholder="Password" onChange={this.handleChange} />
              </div>
            </div>
            <div className="field">
              <label className="label">Confirmation Password</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="password_confirmation" type="password" placeholder="Password" onChange={this.handleChange} />
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
