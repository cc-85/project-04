import React from 'react';



class Login extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  handleSubmit(e) {
    e.preventDefault();

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
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="email" placeholder="Email" onChange={this.handleChange} />
              </div>
            </div>

            <div className="field">
              <label className="label">Password</label>
              <div className="control">
                <input className={`input ${this.state.error ? 'is-danger' : ''} `} name="password" placeholder="Password" onChange={this.handleChange} />
              </div>
            </div>

            <button className="button is-primary">Submit</button>

          </form>
        </div>
      </main>
    );
  }
}

export default Login;
