// src/hooks/useEvents.js
import { useState, useEffect } from "react";
import axios from "axios";

const useEvents = () => {
  const [events, setEvents] = useState([]); // State to hold events
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling
  const dummyEvents = [
    {
      id: 1,
      title: "Meeting with John",
      date: "2024-10-08",
      time: "10:00 AM",
      category: "Work",
      description: "Discussing the Q3 project goals and milestones.",
    },
    {
      id: 2,
      title: "Lunch with Sarah",
      date: "2024-10-09",
      time: "1:00 PM",
      category: "Personal",
      description: "Lunch at the new cafe downtown.",
    },
    {
      id: 3,
      title: "Project Deadline",
      date: "2024-10-12",
      time: "11:59 PM",
      category: "Work",
      description: "Final submission of the project deliverables.",
    },
  ];

  // Function to fetch events from the API
  const fetchEvents = async () => {
    try {
      //   const response = await axios.get("https://calender.free.beeceptor.com/");
      //   console.log("Fetched events:", response.data); // Log fetched events
      //   setEvents(response.data); // Set events from the fetched data
      setEvents(dummyEvents);
    } catch (err) {
      setError("Failed to load events."); // Set error message
      console.error(err); // Log the error for debugging
    } finally {
      setLoading(false); // Set loading to false after fetching
    }
  };

  // Function to add a new event to the API
  const addEvent = async (event) => {
    try {
      const response = await axios.post(
        "https://calender.free.beeceptor.com/",
        event
      ); // Post event to the API
      console.log("Event added:", response.data); // Log the added event
      setEvents((prevEvents) => [
        ...prevEvents,
        { ...event, id: response.data.id },
      ]); // Update state with the new event
    } catch (err) {
      setError("Failed to add event."); // Set error message
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
