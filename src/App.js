// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import Home from './Home';
import UserDashboard from './User/UserDashboard';
import AdminDashboard from './Admin/AdminDashboard';
import Jobs from './Admin/Jobs';
import ViewAppliedJobs from "./Admin/ViewAppliedJobs";
import JobListAdmin from "./Admin/JobListAdmin";
import JobListUser from "./User/JobListUser";
import AddEvent from "./Admin/AddEvent";
import ViewParticipants from "./Admin/ViewParticipants";
import JoinEvent from "./User/JoinEvent";
import UserEvents from './User/UserEvents'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Home />} />
       <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/userdashboard" element={<UserDashboard />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/events" element={<AddEvent />} />
        <Route path="/viewparticipants" element={<ViewParticipants />} />
        <Route path="/joinevents" element={<JoinEvent />} />
        <Route path="/showevents" element={<UserEvents />} />
        <Route path="/viewjobs" element={<JobListUser />} />
        <Route path="/appliedjobs" element={<ViewAppliedJobs />} />
        <Route path="/jobslist" element={<JobListAdmin />} />
      </Routes>
    </Router>
  );
}

export default App;
