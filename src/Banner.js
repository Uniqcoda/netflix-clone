import React, { useEffect, useState } from 'react';
import axios from './axios';
import Requests from './Requests';
import NetflixBanner from './assets/Netflix-banner.png';

import './Banner.css';

function Banner() {
  const [movie, setMovie] = useState();

  const truncate = (string, n) => {
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  };

  useEffect(() => {
    const fetchData = async () => {
      const request = await axios.get(Requests.fetchNetflixOriginals);
      const movies = request.data.results;
      setMovie(movies[Math.floor(Math.random() * movies.length - 1)]);
      return request;
    };

    fetchData();
  }, []);

  return (
    <header
      className='banner'
      style={{
        backgroundImage: `${
          movie ? `url('https://image.tmdb.org/t/p/original${movie?.backdrop_path}')` : `url(${NetflixBanner})`
        }`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
      }}
    >
      <div className='banner__contents'>
        <h1 className='banner__title'>{movie?.title || movie?.name || movie?.original_name}</h1>
        <div className='banner-buttons'>
          <button className='banner__button'>Play</button>
          <button className='banner__button'>My List</button>
        </div>
        <h2 className='banner__description'>{truncate(movie?.overview, 150)}</h2>
      </div>
      <div className='banner--fadeBottom' />
    </header>
  );
}

export default Banner;
