import React from 'react';
import SignedInNavbar from '../SignedInNavbar';
import Navbar from '../Navbar';
import { Container } from 'react-bootstrap'
import { AuthProvider } from '../contexts/AuthContext';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Signup from './Signup';
import Dashboard from './Dashboard';



function App() {
  return (

    <Container className='d-flex align-items-center justify-content-center' style={{minHeight: "100vh"}}>
      <div className='w-100' style={{maxWidth: "400px"}}>
        <Router>
          <AuthProvider>
            <Routes>
              <Route exact path='/' element={<Dashboard />} />
              <Route path='/signup' element={<Signup />} />
            </Routes>
          </AuthProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
