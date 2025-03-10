import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import ResumeParser from './ResumeParser'
import LandingPage from './Pages/LandingPage'
import { LogIn } from 'lucide-react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ResumeParser from './ResumeParser'
import { AuthProvider } from './context/AuthContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProptectedRoute';
import Dashboard from './Pages/Dashboard';


const App = () => {

  useEffect(() => {
    //   fetch('http://localhost:8000/public/yes').then(response => response.text()).then(data => {
    //     console.log(data)
    // })
  }, [])

  return (
    <div>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />

            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App