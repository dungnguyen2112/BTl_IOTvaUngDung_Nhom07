import React, { useState } from 'react';
import { Recycle, User, Lock, LogIn } from 'lucide-react';
import './Login.css';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simple authentication (mock)
    if (username === 'admin' && password === 'admin123') {
      onLogin(username);
    } else {
      setError('Tên đăng nhập hoặc mật khẩu không đúng!');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box animate-slide-down">
        <div className="login-header">
          <Recycle size={60} className="login-icon" />
          <h1>Smart Trash Monitor</h1>
          <p>Hệ thống giám sát thùng rác thông minh</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <User size={18} /> Tên đăng nhập
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tên đăng nhập"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} /> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
              required
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            <LogIn size={18} /> Đăng nhập
          </button>

          <div className="login-info">
            <small>
              Tài khoản demo: <strong>admin</strong> / <strong>admin123</strong>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
