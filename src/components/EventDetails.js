import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";
import useEvents from "../hooks/useEvents";
import Modal from "./Modal";
import EventForm from "./EventForm";

const DetailsContainer = styled.div`
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;
`;

const Button = styled.button`
  padding: 8px 12px;
  margin-right: 10px;
  border: none;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  border-radius: 4px;
`;

const EventDetails = () => {
  const { id } = useParams();
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate();
  const [showEditModal, setShowEditModal] = useState(false);

  const event = events.find((event) => event.id === parseInt(id));

  if (!event) {
    return <p>Event not found!</p>;
  }

  const handleDelete = () => {
    deleteEvent(event.id);
    navigate("/"); // Navigate back to home after deleting
  };

  return (
    <DetailsContainer>
      <h2>{event.title}</h2>
      <p>Date: {event.date}</p>
      <p>Time: {event.time}</p>
      <p>Category: {event.category}</p>
      <p>Description: {event.description}</p>

      <Button onClick={() => setShowEditModal(true)}>Edit</Button>
      <Button onClick={handleDelete} style={{ backgroundColor: "red" }}>
        Delete
      </Button>

      {showEditModal && (
        <Modal onClose={() => setShowEditModal(false)}>
          <EventForm
            selectedDate={new Date(event.date)}
            existingEvent={event}
            onClose={() => setShowEditModal(false)}
          />
        </Modal>
      )}
    </DetailsContainer>
  );
};

export default EventDetails;
