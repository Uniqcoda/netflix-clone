import React from 'react';
import HomeScreen from './screens/Home';
import Login from './screens/LoginScreen';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import './App.css';

function App() {
  // const user = {};
  const user = null;
  return (
    <div className='app'>
      <Router>
        <Routes>
          {!user ? (
            <Route path='/login' element={<Login />} />

          ) : (
              <Route path='/' element={<HomeScreen />} />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
