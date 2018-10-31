import React from 'react';
import { Link } from 'react-router-dom';

const NotSignedInCard = () => {


  return (
    <div className="card">

      <div className="card-content">


        <div className="content">
          <p>🍸 <Link href="#" to="/login"> Log in</Link> or <Link href="#" to="/register"> Register</Link> to filter cocktails by the ingredients you own! 🍸</p>
        </div>

      </div>
    </div>
  );
};

export default NotSignedInCard;
