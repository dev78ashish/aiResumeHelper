import React, { useEffect } from 'react'
// import ResumeParser from './ResumeParser'
import LandingPage from './Pages/LandingPage'
import { LogIn } from 'lucide-react'
import Login from './Pages/Login'
import Signup from './Pages/Signup'
import ResumeParser from './ResumeParser'

const App = () => {

  useEffect(() => {
  //   fetch('http://localhost:8000/public/yes').then(response => response.text()).then(data => {
  //     console.log(data)
  // })
  }, [])

  return (
    <div>
      <ResumeParser />
    </div>
  )
}

export default App