import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaPlay } from 'react-icons/fa';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import axios from '../../utils/axios';
import Requests from '../../utils/Requests';
import NetflixBanner from '../../assets/Netflix-banner.png';

import './index.css';

function Banner() {
  const [movie, setMovie] = useState();

  const navigate = useNavigate();

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
    <div
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
        <h1 className='banner__title'>
          {movie?.name || movie?.title || movie?.original_title || movie?.original_name || 'Movie Title'}
        </h1>
        <div className='banner__buttons'>
          <button className='banner__button' onClick={() => navigate('/player')}>
            <FaPlay title='Play movie'/>
            Play
          </button>
          <button className='banner__button'>
            <AiOutlineInfoCircle title='More info'/>
            More Info
          </button>
        </div>
        <h2 className='banner__description'>{truncate(movie?.overview, 150) || 'Movie description'}</h2>
      </div>
      <div className='banner--fadeBottom' />
    </div>
  );
}

export default Banner;
