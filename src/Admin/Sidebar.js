// src/Admin/Sidebar.js
import React from 'react';
import './Sidebar.css';

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sidebar">
      <ul className="sidebar-list">
        <li>Dashboard</li>
        <li>Users</li>
        <li>Settings</li>
        <li onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</li>
      </ul>
    </div>
  );
};

export default Sidebar;
