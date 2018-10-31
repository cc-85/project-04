import React from 'react';
import { Link } from 'react-router-dom';
import IngredientsSelect from './IngredientsSelect';


const Profile = ({ user, ingredients, handleChange }) => {
  return (
    <div className="card">

      <div className="card-content">
        <div className="media">
          <div className="media-left">
            <figure className="image is-48x48">
              <img src={ user.profile_image } alt="User image"/>
            </figure>
          </div>
          <div className="media-content">
            <p className="title is-4">{ user.username }</p>
          </div>
          <div className="media-right">
            <Link href="#" className="navbar-item nav-icon" to="/edit">Edit Profile</Link>
          </div>
        </div>

        <div className="content">
          <p>My ingredients:</p>
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

      </div>
    </div>

  );
};

export default Profile;
