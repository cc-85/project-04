import React from 'react';
import { Link } from 'react-router-dom';

const NotSignedInCard = () => {


  return (
    <div className="card signin">

      <div className="card-content level">


        <div className="content level-item">
          <p><Link href="#" to="/login"> Sign in</Link> or <Link href="#" to="/register"> Register</Link> to see which cocktails you can make with the ingredients you have!</p>
        </div>

      </div>
    </div>
  );
};

export default NotSignedInCard;
