import React, { useEffect } from 'react';
import HomeScreen from './screens/Home';
import Login from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { auth } from './firebase';
import './App.css';

function App() {
  // const user = {};
  const user = null;
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        // Logged In
        console.log({ userAuth });
      } else {
        // Logged out
        console.log('Logged Out');
      }
    });

    return unsubscribe;
  }, []);
  return (
    <div className='app'>
      <Router>
        <Routes>
          {!user ? <Route path='/login' element={<Login />} /> : <Route path='/' element={<HomeScreen />} />}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
