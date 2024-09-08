import React, { useState, useEffect } from 'react';
import { ref, onValue, update } from 'firebase/database';
import { database, auth } from '../Auth/firebase';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
// import './JoinEvent.css';

function JoinEvent() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            alert(`Logout failed: ${error.message}`);
        }
    };
    const [events, setEvents] = useState([]);
    const userId = auth.currentUser ? auth.currentUser.uid : null;
    const userName = auth.currentUser ? auth.currentUser.displayName : 'Unknown User';
    const userEmail = auth.currentUser ? auth.currentUser.email : 'Unknown Email';

    useEffect(() => {
        const eventRef = ref(database, 'events/');
        onValue(eventRef, (snapshot) => {
            const data = snapshot.val();
            setEvents(data ? Object.entries(data) : []);
        });
    }, []);

    const joinEvent = (eventId) => {
        if (!userId) {
            alert('You must be logged in to join the event.');
            return;
        }

        const eventJoinRef = ref(database, `eventParticipants/${eventId}/${userId}`);
        update(eventJoinRef, {
            name: userName,
            email: userEmail,
            joinedAt: new Date().toISOString(),
        }).then(() => {
            alert('You have successfully joined the event!');
        }).catch((error) => {
            alert(`Error joining event: ${error.message}`);
        });
    };

    return (
        <div>
              <Navbar onLogout={handleLogout} />
       
        <div className="join-event-container">
            <br></br>
            <h1>Available Events</h1>
            {events.length === 0 ? (
                <p>No events available.</p>
            ) : (
                <div className="event-grid">
                    {events.map(([eventId, event]) => (
                        <div key={eventId} className="event-card">
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Location: {event.location}</p>
                            <p>Date: {event.date}</p>
                            <p>Status: {event.status}</p>
                            <button onClick={() => joinEvent(eventId)}>Join Event</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default JoinEvent;
