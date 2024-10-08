import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseURL = "https://calender.free.beeceptor.com"; // Your Beeceptor base URL

  // Fetch events from the API
  const fetchEvents = async () => {
    setLoading(true);
    try {
      // Uncomment the following line to use the API
      // const response = await axios.get(`${baseURL}/`);
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
      setEvents(dummyEvents); // Set events with dummy data
    } catch (err) {
      setError("Failed to fetch events.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Add a new event (POST)
  const addEvent = async (event) => {
    try {
      // Uncomment the following line to use the API
      // const response = await axios.post(`${baseURL}/`, event);
      setEvents((prevEvents) => [...prevEvents, { ...event, id: Date.now() }]); // Append new event with a unique ID
    } catch (err) {
      setError("Failed to add event.");
      console.error(err);
    }
  };

  // Edit an existing event (PUT)
  const editEvent = async (id, updatedEvent) => {
    try {
      // Uncomment the following line to use the API
      // const response = await axios.put(`${baseURL}/${id}`, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        )
      );
    } catch (err) {
      setError("Failed to edit event.");
      console.error(err);
    }
  };

  // Delete an event (DELETE)
  const deleteEvent = async (id) => {
    try {
      // Uncomment the following line to use the API
      // await axios.delete(`${baseURL}/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (err) {
      setError("Failed to delete event.");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{ events, loading, error, addEvent, editEvent, deleteEvent }}
    >
      {children}
    </EventContext.Provider>
  );
};
