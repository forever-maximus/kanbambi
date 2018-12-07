import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'semantic-ui-react';
import './NavBar.css';

const NavBar = () => (
  <div className='nav-wrapper'>
    <Link className='home' to='/'><Button icon='home' /></Link>
    <Link className='title' to='/'><h2>Kanbambi</h2></Link>
  </div>
);

export default NavBar;