import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import { AuthProvider } from './Context/AuthContext';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Components/ProptectedRoute';
import Dashboard from './Pages/Dashboard';
import Alert from './Components/Alert';


const App = () => {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  return (
    <div>
      <AuthProvider>
        <Router>
          {alert && <Alert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
          <Navbar />
          <Routes>
            <Route path='/landingpage' element={<LandingPage />} />
            <Route path='/login' element={<Login showAlert={showAlert} />} />
            <Route path='/signup' element={<Signup showAlert={showAlert} />} />

            <Route
              path='/'
              element={
                <ProtectedRoute>
                  <Dashboard showAlert={showAlert} />
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