import React, { useState, useEffect } from 'react';
import { ref, onValue, remove } from 'firebase/database';
import { database } from '../Auth/firebase';
import './JobListAdmin.css'; // Ensure this path is correct
import Sidebar from './Sidebar';

function JobListAdmin() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    const jobRef = ref(database, 'jobs/');
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      setJobs(data ? Object.entries(data) : []);
    });
  }, []);

  const deleteJob = (id) => {
    remove(ref(database, 'jobs/' + id));
  };

  return (
    <div className="job-list-admin-container">
      <Sidebar />
      <h1>Job List</h1>
      {jobs.length === 0 ? (
        <p>No jobs available.</p>
      ) : (
        jobs.map(([id, job]) => (
          <div key={id} className="job-card">
            <h2>{job.title}</h2>
            <p>{job.description}</p>
            <p>Location: {job.location}</p>
            <p>Status: {job.status}</p>
            <div className="button-group">
              <button className="delete-button" onClick={() => deleteJob(id)}>Delete</button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default JobListAdmin;
