
import { AuthProvider } from '../AuthProvider/AuthContext';
import './index.css'
import Router from './router';
// import React from 'react';
function App() {


  return (
    <AuthProvider>  
     <Router/>
  </AuthProvider>
  )
}

export default App
