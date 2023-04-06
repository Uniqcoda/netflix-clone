import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Login from './screens/LoginScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';
import ProfileScreen from './screens/ProfileScreen';

function App() {
  const user = useSelector(selectUser);
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
      } else {
        // Logged out
        dispatch(logout);
      }
    });

    return unsubscribe;
  }, [dispatch]);

  return (
    <div className='app'>
        <Routes>
          {user ? (
            <>
              <Route path='/' element={<HomeScreen />} /> <Route path='/profile' element={<ProfileScreen />} />
            </>
          ) : (
            <Route path='/login' element={<Login />} />
          )}
        </Routes>
    </div>
  );
}

export default App;
