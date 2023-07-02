import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import ForgotPassword from './pages/ForgotPassword';
import UpdateProfile from './pages/UpdateProfile';
import Home from './pages/Home';
import PopularMovies from './pages/PopularMovies';
import Action from './pages/genres/Action';
import Comedy from './pages/genres/Comedy';
import Drama from './pages/genres/Drama';
import Family from './pages/genres/Family';
import ScienceFiction from './pages/genres/ScienceFiction';
import SearchMovies from './pages/SearchMovies';
import SavedMovies from './pages/SavedMovies';
import UpcomingMovies from './pages/UpcomingMovies';
import Navigation from './components/Navigation';



function App() {
  const { theme } = useTheme()

  const formStyles = {
    maxWidth: "400px"
  }
  return (
    <AuthProvider>
      <Router>
          <div className='App' id={theme}>
          <Navigation/>
          <Routes>
            <Route path='/profile' element={<PrivateRoute><Dashboard className='w-100'/></PrivateRoute>} />
            <Route path='/update-profile' element={<PrivateRoute><UpdateProfile className='w-100' style={formStyles}/></PrivateRoute>} />
            <Route path='/signup' element={<Signup className='w-100' style={formStyles}/>} />
            <Route path='/login' element={<Login className='w-100' style={formStyles}/>} />
            <Route path='/forgot-password' element={<ForgotPassword className='w-100' style={formStyles}/>} />
            <Route exact path="/" element={<Home/>}/>
            <Route path="/popular-movies" element={<PopularMovies/>}/>
            <Route path="/saved-movies" element={<SavedMovies/>}/>
            <Route path="/search-movies" element={<SearchMovies/>}/>
            <Route path="/action" element={<Action/>}/>
            <Route path="/comedy" element={<Comedy/>}/>
            <Route path="/drama" element={<Drama/>}/>
            <Route path="/family" element={<Family/>}/>
            <Route path="/science-fiction" element={<ScienceFiction/>}/>
            <Route path="/upcoming-movies" element={<UpcomingMovies/>}/>
          </Routes>
          </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
