import React, { useCallback, useEffect, useState } from 'react';
import axios from '../../axios';

import './index.css';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const base_url = 'https://image.tmdb.org/t/p/original';

  const fetchData = useCallback(async () => {
    const request = await axios.get(fetchUrl);
    setMovies(request.data.results);
    return request;
  },[fetchUrl]);

  useEffect(() => {
    fetchData();

    return () => {};
  }, [fetchData]);

  return (
    <div className='row'>
      <h2>{title}</h2>
      <div className='row__posters'>
        {movies.length > 0 &&
          movies.map(
            (movie) =>
              ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) && (
                <img
                  key={movie.id}
                  className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
                  src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
                  alt={movie.name}
                />
              )
          )}
      </div>
    </div>
  );
}

export default Row;
