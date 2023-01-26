import React from 'react';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Dashboard from './Dashboard';
import Login from './Login';
import PrivateRoute from './PrivateRoute';
import ForgotPassword from './ForgotPassword';
import UpdateProfile from './UpdateProfile';
import Home from './Home';
import TopMovies from './TopMovies';



function App() {
  const formStyles = {
    maxWidth: "400px"
  }
  return (
          <Router>
            <AuthProvider>
              <Routes>
                <Route exact path='/' element={<PrivateRoute><Dashboard className='w-100' style={formStyles}/></PrivateRoute>} />
                <Route path='/update-profile' element={<PrivateRoute><UpdateProfile className='w-100' style={formStyles}/></PrivateRoute>} />
                <Route path='/signup' element={<Signup className='w-100' style={formStyles}/>} />
                <Route path='/login' element={<Login className='w-100' style={formStyles}/>} />
                <Route path='/forgot-password' element={<ForgotPassword className='w-100' style={formStyles}/>} />
                <Route path="/home" element={<Home/>}/>
                <Route path="/top-movies" element={<TopMovies/>}/>
              </Routes>
            </AuthProvider>
          </Router>
  );
}

export default App;
