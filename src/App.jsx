import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { login, logout, register, getCurrentUser, isAuthenticated } from './services/authService'
import LoginForm from './components/login/LoginForm'
import RegisterForm from './components/login/RegisterForm'
import Home from './components/home/Home'
import './styles/App.css'


function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  // アプリケーション起動時に認証状態をチェック
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await isAuthenticated();
        setLoggedIn(response.authenticated);
      } catch (error) {
        console.error('認証チェックに失敗しました:', error);
        setLoggedIn(false);
      }
    };
    checkAuth();
  }, []);

  // ログイン状態を更新する関数
  const updateAuthStatus = (status) => {
    setLoggedIn(status);
  };

  return (
    <Router>
      <nav>
        <Link to="/register">Register</Link> | <Link to="/login">Login</Link>
      </nav>
      <Routes>
        <Route path="/register" element={<RegisterForm onAuthUpdate={updateAuthStatus} />} />
        <Route path="/login" element={<LoginForm onAuthUpdate={updateAuthStatus} />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
