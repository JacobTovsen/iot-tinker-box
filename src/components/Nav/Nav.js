import React from 'react';
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';



const Nav = () => (
  <div className="navbar">
    <div>
      <ul>
        <li>
          <Link to="/dashboard" >
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/device">
            Devices
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
