import React, { useState } from 'react';
import { ref, set } from 'firebase/database';
import { database } from '../Auth/firebase';
import { signOut } from 'firebase/auth';
import { auth } from '../Auth/firebase';
import { useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar';
// import './AddEvent.css';

function AddEvent() {
    const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      alert(`Logout failed: ${error.message}`);
    }
  };
    const initialEventState = {
        title: '',
        description: '',
        location: '',
        date: '',
        status: 'Upcoming', // Default status is Upcoming
    };

    const [event, setEvent] = useState(initialEventState);

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventRef = ref(database, 'events/' + Date.now());
        set(eventRef, event)
        .then(() => {
            alert('Event added successfully!');
            setEvent(initialEventState); 
        })
        .catch((error) => alert(error.message));
    };

    return (
        <div >
            <Sidebar onLogout={handleLogout} />
        
        <form onSubmit={handleSubmit}>
            <h1>Create Event</h1>
            <input
                type="text"
                placeholder="Event Title"
                value={event.title}
                onChange={(e) => setEvent({ ...event, title: e.target.value })}
                required
            />
            <textarea
                placeholder="Event Description"
                value={event.description}
                onChange={(e) => setEvent({ ...event, description: e.target.value })}
                required
            />
            <input
                type="text"
                placeholder="Location"
                value={event.location}
                onChange={(e) => setEvent({ ...event, location: e.target.value })}
                required
            />
            <input
                type="date"
                placeholder="Event Date"
                value={event.date}
                onChange={(e) => setEvent({ ...event, date: e.target.value })}
                required
            />
            <button type="submit">Create Event</button>
        </form>
        </div>
    );
}

export default AddEvent;
