import React from 'react';
import Banner from '../../components/Banner';
import Nav from '../../components/Nav';
import Rows from '../../components/Rows';

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
