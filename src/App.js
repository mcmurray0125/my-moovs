import React from 'react';
import { AuthProvider } from './contexts/AuthContext';
import { useTheme } from './contexts/ThemeContext';
import { RouterProvider } from 'react-router-dom';

import { router } from './routes'; //See routes.js for routing structure

function App() {
  const { theme } = useTheme()

  return (
    <AuthProvider>
          <div className='App' id={theme}>
            <RouterProvider router={router}/>
          </div>
    </AuthProvider>
  );
}

export default App;
