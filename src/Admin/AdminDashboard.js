// src/AdminDashboard.js
import React from 'react';
import Sidebar from './Sidebar';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  return (
    <div style={styles.container}>
    <Sidebar onLogout={handleLogout} />
    <div style={styles.content}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.text}>Welcome, Admin! Here you can manage users, view analytics, and configure system settings.</p>
    </div>
  </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    backgroundColor: '#f8f9fa',
    paddingLeft: '250px', // Adjust padding based on sidebar width
  },
  content: {
    flex: 1,
    padding: '40px',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
  },
  '@media (max-width: 768px)': {
    container: {
      paddingLeft: '0',
    },
  },
};


export default AdminDashboard;
