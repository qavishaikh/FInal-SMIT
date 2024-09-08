import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Sidebar = ({ onLogout }) => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div style={{ ...styles.sidebar, ...(isOpen ? styles.sidebarOpen : styles.sidebarClosed) }}>
    <button style={styles.toggleButton} onClick={toggleSidebar}>
      ☰
    </button>
    <h2 style={styles.logo}>Admin Panel</h2>
    <ul style={styles.menu}>
      <li style={styles.menuItem} onClick={() => navigate('/admindashboard')}>Dashboard</li>
      <li style={styles.menuItem} onClick={() => navigate('/jobs')}>Add Jobs</li>
      <li style={styles.menuItem} onClick={() => navigate('/appliedjobs')}>View Applied Jobs</li>
      <li style={styles.menuItem} onClick={() => navigate('/jobslist')}>Jobs List</li>
      <li style={styles.menuItem} onClick={() => navigate('/events')}>Add Events</li>
      <li style={styles.menuItem} onClick={() => navigate('/viewparticipants')}>Events Participants</li>
      <li style={styles.menuItem} onClick={onLogout}>Logout</li>
    </ul>
  </div>
  );
};

const styles = {
  sidebar: {
    height: '100vh',
    backgroundColor: '#343a40',
    color: '#fff',
    padding: '20px',
    position: 'fixed',
    top: 0,
    left: 0,
    transition: 'transform 0.3s ease-in-out',
  },
  sidebarOpen: {
    width: '250px',
    transform: 'translateX(0)',
  },
  sidebarClosed: {
    width: '250px',
    transform: 'translateX(-250px)',
  },
  toggleButton: {
    backgroundColor: '#343a40',
    color: '#fff',
    border: 'none',
    fontSize: '24px',
    position: 'absolute',
    top: '20px',
    left: '250px',
    cursor: 'pointer',
    zIndex: 1000,
  },
  logo: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  menu: {
    listStyleType: 'none',
    padding: 0,
    marginTop: '60px',
  },
  menuItem: {
    padding: '10px 0',
    cursor: 'pointer',
    fontSize: '18px',
    borderBottom: '1px solid #495057',
  },
};

export default Sidebar;
