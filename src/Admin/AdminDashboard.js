// src/AdminDashboard.js
import React from 'react';

const AdminDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Admin Dashboard</h1>
      <p style={styles.text}>Welcome, Admin! Here you can manage users, view analytics, and configure system settings.</p>
      <div style={styles.menu}>
        <button style={styles.button}>Manage Users</button>
        <button style={styles.button}>View Analytics</button>
        <button style={styles.button}>System Settings</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f8f9fa',
  },
  heading: {
    fontSize: '36px',
    marginBottom: '20px',
  },
  text: {
    fontSize: '18px',
    marginBottom: '30px',
  },
  menu: {
    display: 'flex',
    gap: '10px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default AdminDashboard;
