import React, { useState } from 'react'
import { login } from '../services/authService'

const LoginForm = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('') // エラーをリセット
    setSuccess('') // 成功メッセージをリセット

    try {
      const response = await login(email, password)
      setSuccess('Login successful!') // 成功メッセージを設定
      console.log('Response:', response) // デバッグ用にレスポンスを表示
      // onLoginSuccess の代わりに必要な処理を書く
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred')
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  )
}

export default LoginForm
