// src/context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
    const [events, setEvents] = useState([]); // Initialize as empty array
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const baseURL = 'https://calender.free.beeceptor.com'; // Your Beeceptor base URL

    // Fetch events from the API
    const fetchEvents = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${baseURL}/`); // Use only base URL
            // Ensure response.data is an array
            if (Array.isArray(response.data)) {
                setEvents(response.data);
            } else {
                // Handle unexpected response structure
                setEvents([]);
                setError('Unexpected response format from API.');
            }
        } catch (err) {
            setError('Failed to fetch events.');
        } finally {
            setLoading(false);
        }
    };

    // Add a new event (POST)
    const addEvent = async (event) => {
        try {
            const response = await axios.post(`${baseURL}/`, event); // Use only base URL
            setEvents((prevEvents) => [...prevEvents, response.data]); // Append new event
            setError(null);
        } catch (err) {
            setError('Failed to add event.');
        }
    };

    // Edit an existing event (PUT)
    const editEvent = async (id, updatedEvent) => {
        try {
            const response = await axios.put(`${baseURL}/${id}`, updatedEvent); // Use only base URL
            setEvents((prevEvents) =>
                prevEvents.map((event) => (event.id === id ? response.data : event))
            );
            setError(null);
        } catch (err) {
            setError('Failed to edit event.');
        }
    };

    // Delete an event (DELETE)
    const deleteEvent = async (id) => {
        try {
            await axios.delete(`${baseURL}/${id}`); // Use only base URL
            setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete event.');
        }
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    return (
        <EventContext.Provider value={{ events, loading, error, addEvent, editEvent, deleteEvent }}>
            {children}
        </EventContext.Provider>
    );
};
