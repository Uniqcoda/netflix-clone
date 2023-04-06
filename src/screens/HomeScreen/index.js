import React from 'react';
import Banner from '../../Banner';
import Nav from '../../Nav';
import Rows from '../../Rows';

import './index.css';

function HomeScreen() {
  return (
    <div className='homeScreen'>
      <Nav />
      <Banner />
      <Rows />
    </div>
  );
}

export default HomeScreen;
