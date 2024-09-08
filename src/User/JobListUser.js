import React, { useState, useEffect } from 'react';
import { ref, onValue, update, get } from 'firebase/database';
import { database } from '../Auth/firebase';
import './Joblist.css';
import Navbar from './Navbar';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';

const JobListUser = () => {
    const [jobs, setJobs] = useState([]);
    const [filter, setFilter] = useState('');

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out.');
                // Optionally redirect to login or home page
                window.location.href = '/login'; // or any route
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    };

    useEffect(() => {
        const jobRef = ref(database, 'jobs/');
        onValue(jobRef, (snapshot) => {
            const data = snapshot.val();
            setJobs(data ? Object.entries(data) : []);
        });
    }, []);

    const applyForJob = async (jobId) => {
        const userId = auth.currentUser.uid;

        const userRef = ref(database, 'users/' + userId);
      const snapshot = await get(userRef);

      if (snapshot.exists()) {
        const userData = snapshot.val();
        console.log(userData)

        const appliedJobsRef = ref(database, `appliedJobs/${jobId}/${userId}`);

        update(appliedJobsRef, {
            email:userData.email,
            name:userData.username,
            userId: userId,
            appliedAt: new Date().toISOString(),
        }).then(() => {
            alert('Application submitted!');
        }).catch((error) => {
            alert(`Error applying for job: ${error.message}`);
        });

      }
        // console.log(data)
// 

        
      
    };

    const filteredJobs = jobs.filter(([id, job]) =>
        filter ? job.category === filter : true
    );

    return (
        <div>
            <Navbar onLogout={handleLogout} />
            <div className="job-list-container">
                <div className="filter-container">
                    <select
                        value={filter}
                        className="filter-dropdown"
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="">All Categories</option>
                        <option value="Frontend">Front-End Developer</option>
                        <option value="Backend">Backend Developer</option>
                        <option value="Mern">Mern Stack</option>
                        <option value="Internship">Internship</option>
                    </select>
                </div>
                <div className="job-grid">
                    {filteredJobs.map(([id, job]) => (
                        <div key={id} className="job-card">
                            <h2>{job.title}</h2>
                            <p>{job.description}</p>
                            <p>Location: {job.location}</p>
                            <p>Status: {job.status}</p>
                            <p>Category: {job.category}</p>
                            <button
                                className="apply-button"
                                onClick={() => applyForJob(id)}
                            >
                                Apply
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default JobListUser;
