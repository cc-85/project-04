import React from 'react';



class Profile extends React.Component {
  constructor() {
    super();
    this.state = { cocktails: []};
  }



  render() {
    return (
      <h1 className="title is-1">User Profile Page</h1>
    );
  }
}

export default Profile;
