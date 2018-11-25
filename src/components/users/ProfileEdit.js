import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import Flash from '../../lib/Flash';


class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, errors: {}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.redirectToLogIn = this.redirectToLogIn.bind(this);

  }

  componentDidMount() {
    if (Auth.isAuthenticated()){
      const token = Auth.getToken();
      axios
        .get(`/api/users/${Auth.getPayload().sub}`,
          {headers: {Authorization: `Bearer ${token}`}}
        )
        .then(res => this.setState({ user: res.data }));

    } else {
      Flash.setMessage('warning', 'Please sign in');
      this.props.history.push('/login');
    }

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

  redirectToLogIn(){
    this.props.history.push('/login');
  }


  render() {
    if(!this.state.user) return null;
    return (

      <div className="box">
        <form onSubmit={this.handleSubmit}>
          <h1 className="title is-1 has-text-centered">Edit profile</h1>

          <div className="level">
            <div className="level-item">
              <figure className="image profile-picture is-128x128">
                {!this.state.user.profile_image ? <img src='./assets/images/person-placeholder.jpg' /> : <img src={this.state.user.profile_image} />}
              </figure>
            </div>
          </div>



          <div className="columns field is-mobile">
            <div className="column is-one-quarter">
              <label className="label">Name</label>
            </div>
            <div className="column primary">
              <div className="control">
                <input
                  className={`input ${this.state.errors.username ? 'is-danger' : ''} `}
                  name="username"
                  placeholder="Name"
                  onChange={this.handleChange}
                  value={this.state.user.username  || ''}
                />
                {this.state.errors.username && <small className="help is-danger">{this.state.errors.username}</small>}
              </div>
            </div>
          </div>

          <div className="columns field is-mobile">
            <div className="column is-one-quarter">
              <label className="label">Email</label>
            </div>
            <div className="column primary">
              <div className="control">
                <input
                  className={`input ${this.state.errors.email ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.user.email  || ''}
                />
                {this.state.errors.email && <small className="help is-danger">{this.state.errors.email}</small>}
              </div>
            </div>
          </div>

          <div className="columns field is-mobile">
            <div className="column is-one-quarter">

              <label className="label">Profile Image</label>

            </div>
            <div className="column primary">
              <div className="control">
                <input
                  className={`input ${this.state.errors.profile_image ? 'is-danger' : ''} `}
                  name="profile_image"
                  placeholder="Profile Image"
                  onChange={this.handleChange}
                  value={this.state.user.profile_image || ''}
                />
                {this.state.errors.profile_image && <small className="help is-danger">{this.state.errors.profile_image}</small>}
              </div>
            </div>
          </div>


          <div className="control">
            <div className="level control">
              <div className="level-item">
                <button className="button">Save</button>
              </div>
            </div>
          </div>

        </form>
      </div>
    );
  }
}

export default ProfileEdit;
