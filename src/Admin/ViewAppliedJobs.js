import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database } from '../Auth/firebase';
import Sidebar from './Sidebar';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';
import './ViewAppliedJobs.css';

function ViewAppliedJobs() {
  const navigate = useNavigate();
  const [appliedJobs, setAppliedJobs] = useState({});
  const [jobs, setJobs] = useState({});

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };

  useEffect(() => {
    const appliedJobRef = ref(database, 'appliedJobs/');
    onValue(appliedJobRef, (snapshot) => {
      const data = snapshot.val();
      console.log(data)
      setAppliedJobs(data || {});
    });
  }, []);

  useEffect(() => {
    const jobRef = ref(database, 'jobs/');
    onValue(jobRef, (snapshot) => {
      const data = snapshot.val();
      setJobs(data || {});
    });
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Format as 'MM/DD/YYYY'
  };

  const handleAccept = (jobId, userId) => {
    const userRef = ref(database, `appliedJobs/${jobId}/${userId}`);
    update(userRef, { status: 'Accepted' })
      .then(() => {
        alert('Application accepted!');
      })
      .catch((error) => {
        alert(`Error accepting application: ${error.message}`);
      });
  };

  const handleReject = (jobId, userId) => {
    const userRef = ref(database, `appliedJobs/${jobId}/${userId}`);
    update(userRef, { status: 'Rejected' })
      .then(() => {
        alert('Application rejected!');
      })
      .catch((error) => {
        alert(`Error rejecting application: ${error.message}`);
      });
  };

  return (
    <div className="view-applied-jobs-container">
      <Sidebar onLogout={handleLogout} />
      <h1>Applied Jobs</h1>
      {Object.keys(appliedJobs).length === 0 ? (
        <p className="no-jobs-message">No applied jobs found.</p>
      ) : (
        <div className="job-grid">
          {Object.entries(appliedJobs).map(([jobId, users]) => (
            <div key={jobId} className="job-card">
              <h2>{jobs[jobId]?.title || 'Unknown Job'}</h2>
              <p>{jobs[jobId]?.description || 'No Description'}</p>
              <p>Status: {jobs[jobId]?.status || 'Unknown Status'}</p>
              <h3>Applicants:</h3>
              {Object.keys(users).length > 0 ? (
                <table className="applicants-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Date Applied</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Object.entries(users).map(([userId, user]) => (
                      <tr key={userId}>
                        <td>{user.name || 'Unknown'}</td>
                        <td>{user.email || 'No Email'}</td>
                        <td>{formatDate(user.appliedAt)}</td>
                        <td>
                          {user.status === 'Accepted' || user.status === 'Rejected' ? (
                            <p>{user.status}</p>
                          ) : (
                            <>
                              <button onClick={() => handleAccept(jobId, userId)} className="accept-button">Accept</button>
                              <button onClick={() => handleReject(jobId, userId)} className="reject-button">Reject</button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>No applicants yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default ViewAppliedJobs;
