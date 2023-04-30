import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import PlayerScreen from './screens/PlayerScreen';
import MoviesScreen from './screens/MoviesScreen';
import { auth } from './utils/firebase';
import { login, logout } from './features/userSlice';
import './App.css';
import ProfileScreen from './screens/ProfileScreen';

const ProtectedRoute = ({ isLoggedIn, children }) => {
  if (!isLoggedIn) {
    return <Navigate to='/login' replace />;
  }
  return children;
};

const AuthRoute = ({ isLoggedIn, children }) => {
  if (isLoggedIn) {
    return <Navigate to='/' replace />;
  }
  return children;
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged In
        dispatch(
          login({
            uid: userAuth.uid,
            email: userAuth.email,
          })
        );
        setIsLoggedIn(true);
      } else {
        // Logged out
        dispatch(logout);
        setIsLoggedIn(false);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
      <Routes>
        <Route
          path='/'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <HomeScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <ProfileScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path='/player'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <PlayerScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path='/movies'
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MoviesScreen />
            </ProtectedRoute>
          }
        />
        <Route
          path='/login'
          element={
            <AuthRoute isLoggedIn={isLoggedIn}>
              <Login />
            </AuthRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
