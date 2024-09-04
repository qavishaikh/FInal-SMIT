// src/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const HomePage = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My App</h1>
      <p>Please choose an option to proceed:</p>
      <div className="link-container">
        <Link to="/login" className="home-link1">Login</Link>
        <Link to="/signup" className="home-link">Sign Up</Link>
      </div>
    </div>
  );
};

export default HomePage;
