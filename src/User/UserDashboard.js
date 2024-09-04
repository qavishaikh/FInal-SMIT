// src/UserDashboard.js
import React from 'react';

const UserDashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>User Dashboard</h1>
      <p style={styles.text}>Welcome, User! Here you can view your profile, manage your orders, and explore new services.</p>
      <div style={styles.menu}>
        <button style={styles.button}>View Profile</button>
        <button style={styles.button}>Manage Orders</button>
        <button style={styles.button}>Explore Services</button>
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
    backgroundColor: '#e9ecef',
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
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
  },
};

export default UserDashboard;
