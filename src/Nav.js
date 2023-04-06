import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import NetflixLogo from './assets/Netflix-logo.png';
import NetflixAvatar from './assets/Netflix-avatar.png';

import './Nav.css';

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', transitionNavBar);

    // add a clean up function that will run after updating the DOM
    return () => window.removeEventListener('scroll', transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && 'nav__black'}`}>
      <div className='nav__contents'>
        <img
          src={NetflixLogo}
          onClick={() => {
            navigate('/');
          }}
          alt=''
          className='nav__logo'
        />
        <img
          src={NetflixAvatar}
          onClick={() => {
            navigate('/profile');
          }}
          alt=''
          className='nav__avatar'
        />
      </div>
    </div>
  );
}

export default Nav;
