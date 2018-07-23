import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => (
  <div className="navbar">
    <div>
      <ul style={{display: 'flex', justifyContent: 'center'}}>
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
        <li>
          <Link to="/tech">
            Tech
          </Link>
        </li>
        <li>
          <Link to="/bio">
            Bio
          </Link>
        </li>
      </ul>
    </div>
  </div>
);

export default Nav;
