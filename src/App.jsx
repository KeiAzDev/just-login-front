import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login, logout, register, getCurrentUser, isAuthenticated } from './services/authService'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/login/RegisterForm'
import Home from './components/home/Home'
import './styles/App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data.message)
    setLoggedIn(true)
  }

  return (
    <>
      <Router>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
