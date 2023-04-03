import React from 'react';
import NetflixBanner from './assets/Netflix-banner.png';

import './Banner.css';

function Banner() {
  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  return (
    <header
      className='banner'
      style={{ backgroundImage: `url(${NetflixBanner})`, backgroundSize: 'cover', backgroundPosition: 'center center' }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>Movie Name</h1>
        <div className='banner-buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h2 className='banner__description'>
          {truncate(
            `This is the movie description that is a test description description description description description description a test description description description description description description a test description description description description description description a test description description description description description description.`,
            150
          )}
        </h2>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
