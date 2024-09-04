// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from './Home';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
