import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { signOut } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { database, auth } from '../Auth/firebase'; // Make sure auth is properly imported
import './UserEvents.css'; // Add your styles here
import Navbar from './Navbar';

function UserEvents() {
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await signOut(auth);
            navigate('/login');
        } catch (error) {
            alert(`Logout failed: ${error.message}`);
        }
    };
    const [joinedEvents, setJoinedEvents] = useState({});
    const [allEvents, setAllEvents] = useState({});
    const userId = auth.currentUser.uid; // Get the logged-in user's ID

    useEffect(() => {
        // Fetch the list of all events
        const eventRef = ref(database, 'events/');
        onValue(eventRef, (snapshot) => {
            const data = snapshot.val();
            setAllEvents(data || {});
        });

        // Fetch the events that the user has joined
        const userEventsRef = ref(database, `eventParticipants/`);
        onValue(userEventsRef, (snapshot) => {
            const data = snapshot.val() || {};
            const userJoinedEvents = {};
            Object.keys(data).forEach((eventId) => {
                if (data[eventId][userId]) {
                    userJoinedEvents[eventId] = data[eventId][userId];
                }
            });
            setJoinedEvents(userJoinedEvents);
        });
    }, [userId]);

    return (
        <div>
            <Navbar onLogout={handleLogout} />
        
        <div className="user-events-container">
            <h1>Events You've Joined</h1>
            {Object.keys(joinedEvents).length === 0 ? (
                <p>You haven't joined any events yet.</p>
            ) : (
                <div className="events-grid">
                    {Object.keys(joinedEvents).map((eventId) => (
                        <div key={eventId} className="event-card">
                            <h2>{allEvents[eventId]?.title || 'Unknown Event'}</h2>
                            <p>{allEvents[eventId]?.description || 'No description available'}</p>
                            <p>Date: {allEvents[eventId]?.date || 'No date'}</p>
                            <p>Joined on: {new Date(joinedEvents[eventId]?.joinedAt).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
        </div>
    );
}

export default UserEvents;
