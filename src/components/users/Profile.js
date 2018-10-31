import React from 'react';
import { Link } from 'react-router-dom';
import IngredientsSelect from './IngredientsSelect';


const Profile = ({ user, ingredients, handleChange }) => {
  return (
    <main className="section">
      <div className="container">

        <h1 className="title is-1">User Profile Page</h1>

        <figure className="image profile-picture is-128x128">
          <img src={ user.profile_image } />
        </figure>

        <h4 className="title is-4">Username:</h4>
        <p>{ user.username }</p>

        <h4 className="title is-4">Email:</h4>
        <p>{ user.email }</p>

        <h4 className="title is-4">Image link:</h4>
        <p>{ user.profile_image }</p>

        <Link href="#" className="navbar-item nav-icon" to="/edit">Edit</Link>

        <h1 className="title is-1">Ingredients Page</h1>

        <IngredientsSelect
          isMulti
          name="colors"
          ingredients={ingredients}
          defaultValue={user.ingredients}
          className="basic-multi-select"
          classNamePrefix="select"
          onChange={handleChange}
        />

      </div>
    </main>
  );
};

export default Profile;
