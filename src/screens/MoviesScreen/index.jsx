import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, getGenres } from '../../store';
import SelectGenre from '../../components/SelectGenre';
import Nav from '../../components/Nav';
import Slider from '../../components/Slider';
import NotAvailable from '../../components/NotAvailable';
import './index.css';

function MoviePage() {
  const movies = useSelector((state) => state.netflix.movies);
  const genres = useSelector((state) => state.netflix.genres);
  const genresLoaded = useSelector((state) => state.netflix.genresLoaded);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  useEffect(() => {
    if (genresLoaded) {
      dispatch(fetchMovies({ genres, type: 'movie' }));
    }
  }, [dispatch, genres, genresLoaded]);

  return (
    <div className='moviesScreen'>
      <div className='navbar'>
        <Nav />
      </div>
      <div className='data'>
        <SelectGenre genres={genres} type='movie' />
        {movies.length ? <Slider movies={movies} /> : <NotAvailable />}
      </div>
    </div>
  );
}

export default MoviePage;
