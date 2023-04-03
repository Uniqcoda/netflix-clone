import React from 'react';
import Banner from './Banner';
import Nav from './Nav';

import './HomeScreen.css';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      {/* Rows */}
    </div>
  );
}

export default HomeScreen;
