import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../Auth/firebase';
import './AddJob.css';

function AddJob() {
    const initialJobState = {
        title: '',
        description: '',
        location: '',
        salary: '',
        category: 'Full-time',
        experience: '',
        status: 'Pending', // Default status is Pending
      };
    
      const [job, setJob] = useState(initialJobState);

  const handleSubmit = (e) => {
    e.preventDefault();
    const jobRef = ref(database, 'jobs/' + Date.now());
    set(jobRef, job)
    .then(() => {
        alert('Job added successfully!');
        setJob(initialJobState); // Reset the form fields after successful submission
      })
      .catch((error) => alert(error.message));
  };

  return (
    <form onSubmit={handleSubmit}>
        <h1>Job Form</h1>
      <input
        type="text"
        placeholder="Job Title"
        value={job.title}
        onChange={(e) => setJob({ ...job, title: e.target.value })}
        required
      />
      <textarea
        placeholder="Job Description"
        value={job.description}
        onChange={(e) => setJob({ ...job, description: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Location"
        value={job.location}
        onChange={(e) => setJob({ ...job, location: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Salary"
        value={job.salary}
        onChange={(e) => setJob({ ...job, salary: e.target.value })}
        required
      />
      <select
        value={job.category}
        onChange={(e) => setJob({ ...job, category: e.target.value })}
        required
      >
        <option value="Frontend">Front-End Developer</option>
        <option value="Backend">Backend Developer</option>
        <option value="Mern-Stack">Mern Stack </option>
        <option value="Internship">Internship</option>
      </select>
      <input
        type="text"
        placeholder="Experience Level (e.g., Entry, Mid, Senior)"
        value={job.experienceLevel}
        onChange={(e) => setJob({ ...job, experienceLevel: e.target.value })}
        required
      />
      <button type="submit">Add Job</button>
    </form>
  );
}

export default AddJob;
