import React from 'react';
import Navbar from '../User/Navbar';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';


const UserDashboard = () => {
  
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
    <div>
      <Navbar onLogout={handleLogout}/>
      <div style={styles.container}>
        <h1 style={styles.heading}>User Dashboard</h1>
        <p style={styles.text}>Welcome, User! Here you can view your profile, manage your orders, and explore new services.</p>
       
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
    paddingTop: '80px', // Adjusted for the fixed navbar height
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

  
};

export default UserDashboard;
