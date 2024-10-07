// src/hooks/useEvents.js
import { useState, useEffect } from 'react';
import axios from 'axios';

const useEvents = () => {
    const [events, setEvents] = useState([]); // State to hold events
    const [loading, setLoading] = useState(true); // State for loading status
    const [error, setError] = useState(null); // State for error handling

    // Function to fetch events from the API
    const fetchEvents = async () => {
        try {
            const response = await axios.get('https://calender.free.beeceptor.com/');
            console.log("Fetched events:", response.data); // Log fetched events
            setEvents(response.data); // Set events from the fetched data
        } catch (err) {
            setError('Failed to load events.'); // Set error message
            console.error(err); // Log the error for debugging
        } finally {
            setLoading(false); // Set loading to false after fetching
        }
    };

    // Function to add a new event to the API
    const addEvent = async (event) => {
        try {
            const response = await axios.post('https://calender.free.beeceptor.com/', event); // Post event to the API
            console.log("Event added:", response.data); // Log the added event
            setEvents((prevEvents) => [...prevEvents, { ...event, id: response.data.id }]); // Update state with the new event
        } catch (err) {
            setError('Failed to add event.'); // Set error message
            console.error(err); // Log the error for debugging
        }
    };

    // Fetch events when the component mounts
    useEffect(() => {
        fetchEvents();
    }, []);

    // Return event data and functions for use in components
    return { events, loading, error, addEvent };
};

export default useEvents;
