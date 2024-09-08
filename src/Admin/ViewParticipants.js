import React, { useState, useEffect } from 'react';
import { ref, onValue } from 'firebase/database';
import { database } from '../Auth/firebase';
import Sidebar from './Sidebar'; // Assuming you have a Sidebar component for navigation
import './ViewParticipants.css';

function ViewParticipants() {
    const [events, setEvents] = useState({});
    const [participants, setParticipants] = useState({});

    useEffect(() => {
        const eventRef = ref(database, 'events/');
        onValue(eventRef, (snapshot) => {
            const data = snapshot.val();
            setEvents(data || {});
        });
    }, []);

    useEffect(() => {
        const participantsRef = ref(database, 'eventParticipants/');
        onValue(participantsRef, (snapshot) => {
            const data = snapshot.val();
            setParticipants(data || {});
        });
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString();
    };

    return (
        <div className="view-participants-container">
            <Sidebar />
            <h1>Event Participants</h1>
            {Object.keys(events).length === 0 ? (
                <p>No events found.</p>
            ) : (
                <div className="event-grid">
                    {Object.entries(events).map(([eventId, event]) => (
                        <div key={eventId} className="event-card">
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <p>Date: {event.date}</p>
                            <p>Status: {event.status}</p>
                            <h3>Participants:</h3>
                            {participants[eventId] ? (
                                <table className="participants-table">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Email</th>
                                            <th>Joined At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Object.entries(participants[eventId]).map(([userId, user]) => (
                                            <tr key={userId}>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{formatDate(user.joinedAt)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            ) : (
                                <p>No participants yet.</p>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ViewParticipants;
