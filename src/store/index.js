import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import userReducer from '../features/userSlice';
import { API_KEY, TMDB_BASE_URL } from '../utils/constants';

const initialState = {
  movies: [],
  genresLoaded: false,
  genres: [],
};

export const getGenres = createAsyncThunk('netflix/genres', async () => {
  const {
    data: { genres },
  } = await axios.get(`${TMDB_BASE_URL}/genre/movie/list?api_key=${API_KEY}`);
  return genres;
});

const createArrayFromRawData = (array, moviesArray, genres) => {
  array.forEach((movie) => {
    const movieGenres = [];
    movie.genre_ids.forEach((genreId) => {
      const name = genres.find(({ id }) => id === genreId);
      if (name) movieGenres.push(name.name);
    });
    // If a movie does not have a back_drop image, it would be skipped
    if (movie.backdrop_path)
      moviesArray.push({
        id: movie.id,
        name: movie?.name || movie?.title || movie?.original_title || movie?.original_name || 'Movie Title',
        image: movie.backdrop_path,
        genres: movieGenres.slice(0, 3),
      });
  });
};

const getRawData = async (api, genres, paging = false) => {
  const moviesArray = [];
  // There are 20 movies per page for each API request, therefore, this loop will run 3 times to fetch 60 movies.
  // If any movie is skipped due to the back_drop condition, then the loop will run more times but less than 10 times.
  for (let i = 1; moviesArray.length < 60 && i < 10; i++) {
    const {
      data: { results },
    } = await axios.get(`${api}${paging ? `&page=${i}` : ''}`);
    createArrayFromRawData(results, moviesArray, genres);
  }
  return moviesArray;
};

export const fetchDataByGenre = createAsyncThunk('netflix/genre', async ({ genre, type }, thunkAPI) => {
  const {
    netflix: { genres },
  } = thunkAPI.getState();

  return getRawData(`${TMDB_BASE_URL}/discover/${type}?api_key=${API_KEY}&with_genres=${genre}`, genres);
});

export const fetchMovies = createAsyncThunk('netflix/trending', async ({ type }, thunkAPI) => {
  const {
    netflix: { genres },
  } = thunkAPI.getState();

  return getRawData(`${TMDB_BASE_URL}/trending/${type}/week?api_key=${API_KEY}`, genres, true);
});

// export const getUsersLikedMovies = createAsyncThunk('netflix/getLiked', async (email) => {
//   const {
//     data: { movies },
//   } = await axios.get(`http://localhost:5000/api/user/liked/${email}`);
//   return movies;
// });

// export const removeMovieFromLiked = createAsyncThunk('netflix/deleteLiked', async ({ movieId, email }) => {
//   const {
//     data: { movies },
//   } = await axios.put('http://localhost:5000/api/user/remove', {
//     email,
//     movieId,
//   });
//   return movies;
// });

const NetflixSlice = createSlice({
  name: 'Netflix',
  initialState,
  extraReducers: (builder) => {
    builder.addCase(getGenres.fulfilled, (state, action) => {
      state.genres = action.payload;
      state.genresLoaded = true;
    });
    builder.addCase(fetchMovies.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    builder.addCase(fetchDataByGenre.fulfilled, (state, action) => {
      state.movies = action.payload;
    });
    // builder.addCase(getUsersLikedMovies.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
    // builder.addCase(removeMovieFromLiked.fulfilled, (state, action) => {
    //   state.movies = action.payload;
    // });
  },
});

export const store = configureStore({
  reducer: {
    netflix: NetflixSlice.reducer,
    user: userReducer,
  },
});

export const { setGenres, setMovies } = NetflixSlice.actions;
