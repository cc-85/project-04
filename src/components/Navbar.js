import React from 'react';
import { Link, withRouter } from 'react-router-dom';


class Navbar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

  }


  render() {
    return (
      <nav className="navbar is-fixed-top" role="navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link className="navbar-item logo" to="/">
              <h1 className="cocktails-title">Cocktails App</h1>
            </Link>

            <a role="button"
              className="navbar-burger"
              data-target="navbar-menu"
              aria-label="menu"
              aria-expanded={this.state.navbarActive ? 'true' : 'false'}
              onClick={this.toggleNavbar}
            >
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
            </a>
          </div>


          <div className="navbar-menu">
            <div className="navbar-end">
              <Link className="navbar-item" to="/cocktails"> All cocktails</Link>
              <a className="navbar-item" onClick={this.logout}>Logout</a>
              <Link href="#" className="navbar-item nav-icon" to="/profile">Profile</Link>
              <Link href="#" className="navbar-item" to="/login"> Login </Link>
              <Link href="#" className="navbar-item" to="/register"> Register</Link>
            </div>
          </div>
        </div>

      </nav>
    );
  }
}

export default withRouter(Navbar);
