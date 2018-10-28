import React from 'react';
import axios from 'axios';
import Auth from '../../lib/Auth';


class ProfileEdit extends React.Component {
  constructor() {
    super();
    this.state = { user: {}, errors: {} };
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
    this.setState({ user, error: '' });
  }

  handleSubmit(e) {
    e.preventDefault();
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
      .catch(() => this.setState({error: 'Invalid credentials'}));
  }

  render() {
    if(!this.state.user) return null;
    return (
      <main className="section">
        <div className="container">

          <h1 className="title is-1">User Profile Edit Page</h1>

          <form onSubmit={this.handleSubmit}>

            <div className="field">
              <label className="label">Email</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="email"
                  placeholder="Email"
                  onChange={this.handleChange}
                  value={this.state.user.email  || ''}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Username</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={this.state.user.username  || ''}
                />
              </div>
            </div>

            <figure className="image profile-picture is-128x128">
              <img src={ this.state.user.profile_image } />
            </figure>

            <div className="field">
              <label className="label">Profile Image</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="profile_image"
                  placeholder="Profile Image"
                  onChange={this.handleChange}
                  value={this.state.user.profile_image  || ''}
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  type="password"
                />
              </div>
            </div>

            <div className="field">
              <label className="label">Confirm Password</label>
              <div className="control">
                <input
                  className={`input ${this.state.error ? 'is-danger' : ''} `}
                  name="password_confirmation"
                  placeholder="Confirm Password"
                  onChange={this.handleChange}
                  type="password"
                />
              </div>
            </div>

            {/* {
            	"email": "james@gmail.com",
            	"id": 2,
            	"ingredients": [{"name": "Rum"}, {"name": "Brandy"}, {"name": "Egg"}],
            	"password": "pass",
            	"password_confirmation": "pass",
            	"username": "James Robins",
            	"profile_image": "https://assets3.thrillist.com/v1/image/1369741/size/tmg-article_default_mobile.jpg"
            } */}

            <button className="button is-primary">Submit</button>

          </form>

          <h4 className="title is-4">Ingredients</h4>
          <ul>
            { this.state.user.ingredients ? this.state.user.ingredients.map(ingredient =>
              <li key={ingredient.id}>{ ingredient.name }</li>
            ) : <p>Add ingredients</p>}
          </ul>

        </div>
      </main>
    );
  }
}

export default ProfileEdit;
