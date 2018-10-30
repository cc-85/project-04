import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';
import { Link } from 'react-router-dom';



class Profile extends React.Component {
  constructor() {
    super();
    this.state = { cocktails: []};
  }

  componentDidMount() {
    const token = Auth.getToken();
    axios.get(`/api/users/${Auth.getPayload().sub}`, {
      headers: {Authorization: `Bearer ${token}`}
    })
      .then(res => this.setState({ user: res.data }));

  }

  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <h1 className="title is-1">User Profile Page</h1>

          <figure className="image profile-picture is-128x128">
            <img src={ this.state.user.profile_image } />
          </figure>

          <h4 className="title is-4">Username:</h4>
          <p>{  this.state.user.username }</p>

          <h4 className="title is-4">Email:</h4>
          <p>{  this.state.user.email }</p>

          <h4 className="title is-4">Image link:</h4>
          <p>{  this.state.user.profile_image }</p>

          <Link href="#" className="navbar-item nav-icon" to="/edit">Edit</Link>

        </div>
      </main>
    );
  }
}

export default Profile;
