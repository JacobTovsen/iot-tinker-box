import React from 'react';
import Pic from '../../Images/thermobile.jpg';

const Header = ({ title }) => (
  <div className="background">
    <div>
      <div className="pic" align="center">
        <img src={Pic} width="300" alt="Broken Pic"/>
      </div>
      <h1 className="lead">{ title }</h1>
    </div>
  </div>
);

export default Header;
