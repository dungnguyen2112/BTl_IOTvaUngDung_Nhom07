import React from 'react';
import { Recycle, UserCircle, LogOut } from 'lucide-react';
import './Header.css';

const Header = ({ currentUser, onLogout }) => {
  const handleLogout = () => {
    if (window.confirm('Bạn có chắc muốn đăng xuất?')) {
      onLogout();
    }
  };

  return (
    <header className="dashboard-header">
      <div className="header-left">
        <Recycle size={32} className="header-icon" />
        <h1>Smart Trash Monitor</h1>
      </div>
      <div className="header-right">
        <span className="user-info">
          <UserCircle size={24} />
          <span>{currentUser}</span>
        </span>
        <button onClick={handleLogout} className="btn-logout">
          <LogOut size={18} /> Đăng xuất
        </button>
      </div>
    </header>
  );
};

export default Header;
