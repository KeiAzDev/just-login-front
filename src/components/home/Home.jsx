import React from 'react'
import { login, getCurrentUser } from './services/authService';

export const handleLogin = async (email, password) => {
  try {
    const loginResponse = await login(email, password);
    console.log('ログイン成功:', loginResponse);
  } catch (error) {
    console.error('ログイン失敗:', error);
  }
};

export const fetchCurrentUser = async () => {
  try {
    const user = await getCurrentUser();
    console.log('現在のユーザー:', user);
  } catch (error) {
    console.error('ユーザー取得失敗:', error);
  }
};


const Home = () => {
  return (
    <div>
      home画面です
    </div>
  )
}

export default Home
