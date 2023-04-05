import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeScreen from './screens/Home';
import Login from './screens/LoginScreen';
import { auth } from './firebase';
import { login, logout, selectUser } from './features/userSlice';
import './App.css';

function App() {
  // const user = {};
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
        // console.log({ userAuth });
      } else {
        // Logged out
        dispatch(logout);
        // console.log('Logged Out');
      }
    });

    return unsubscribe;
  }, []);
  return (
    <div className='app'>
      <Router>
        <Routes>
          {user ? <Route path='/' element={<HomeScreen />} /> : <Route path='/login' element={<Login />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
