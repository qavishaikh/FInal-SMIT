// src/User/UserNavbar.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../Auth/firebase';
import { signOut } from 'firebase/auth';
import './UserNavbar.css'; 

const UserNavbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to home page after logout
    } catch (error) {
      console.error('Error signing out:', error.message);
    }
  };

  return (
    <nav className="user-navbar">
      <ul>
        <li><a href="/user-dashboard">Dashboard</a></li>
        <li><a href="/profile">Profile</a></li>
        <li><a href="/settings">Settings</a></li>
        <li><button onClick={handleLogout}>Logout</button></li>
      </ul>
    </nav>
  );
};

export default UserNavbar;
