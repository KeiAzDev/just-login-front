import { useState, useEffect } from 'react'
import { login, logout, register, getCurrentUser, isAuthenticated } from './services/authService'
import LoginForm from './components/LoginForm'
import './styles/App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState(false)

  const handleLoginSuccess = (data) => {
    console.log('Login successful:', data.message)
    setLoggedIn(true)
  }

  return (
    <>
      <div className='container'>
        {!loggedIn ? <LoginForm onLoginSuccess={handleLoginSuccess} /> : <h1>Welcome to the app!</h1>}
      </div>
    </>
  )
}

export default App
