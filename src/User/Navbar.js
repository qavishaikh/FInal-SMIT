import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';


const Navbar = ({ onLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
 
  const navigate = useNavigate();

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

 

  return (
    <nav className="navbar">
      <div className="navbar-brand" onClick={() => navigate('/userdashboard')}>
        MyApp
      </div>
      <div className="navbar-toggle-button" onClick={toggleNavbar}>
        ☰
      </div>
      <div className={`navbar-links-container ${isOpen ? 'open' : ''}`}>
        <div className="navbar-link" onClick={() => navigate('/userdashboard')}>Dashboard</div>
        <div className="navbar-link" onClick={() => navigate('/viewjobs')}>Jobs</div>
        <div className="navbar-link" onClick={() => navigate('/showevents')}>Events</div>
        <div className="navbar-link" onClick={() => navigate('/joinevents')}>Join Events</div>
        <div className="navbar-link" onClick={onLogout}>Logout</div>
        
      </div>
    </nav>
  );
};

export default Navbar;
