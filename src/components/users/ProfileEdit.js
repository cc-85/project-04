import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';


class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, errors: {}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);

  }

  componentDidMount() {
    const token = Auth.getToken();
    axios
      .get(`/api/users/${Auth.getPayload().sub}`,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      .then(res => this.setState({ user: res.data }));

  }

  handleChange(e) {
    const user = { ...this.state.user, [e.target.name]: e.target.value };
    this.setState({ user, errors: '' }, () => console.log(this.state));
  }

  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.user);
    const token = Auth.getToken();
    axios
      .put(`/api/users/${Auth.getPayload().sub}`,
        this.state.user,
        {headers: {Authorization: `Bearer ${token}`}}
      )
      // .then( res => {
      //   Auth.setToken(res.data.token);
      //   this.props.history.push('/');
      // })
      .then(() => this.props.history.push('/profile'))
      .catch(err => this.setState({ errors: err.response.data.error }));
  }



  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <h1 className="title is-1">User Profile Edit Page</h1>

          <div className="box"></div>

          <figure className="image profile-picture is-128x128">
            {!this.state.user.profile_image ? <img src='./assets/images/person-placeholder.jpg' /> : <img src={ this.state.user.profile_image } /> }
          </figure>

          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.user.email  || ''}
                />
              </div>
            </div>
            {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}


            <div className="field">
              <label className="label">Name</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.username ? 'is-danger' : ''} `}
                  name="username"
                  placeholder="Name"
                  onChange={this.handleChange}
                  value={this.state.user.username  || ''}
                />
              </div>
            </div>
            {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}





            <div className="field">
              <label className="label">Profile Image</label>
              <div className="control">
                <input
                  className={`input ${this.state.errors.profile_image ? 'is-danger' : ''} `}
                  name="profile_image"
                  placeholder="Profile Image"
                  onChange={this.handleChange}
                  value={this.state.user.profile_image || ''}
                />
              </div>
            </div>
            {this.state.errors.profile_image && <small className="help is-danger">{this.state.errors.profile_image}</small>}

            <button className="button is-primary">Submit</button>
          </form>
        </div>
      </main>
    );
  }
}

export default ProfileEdit;
