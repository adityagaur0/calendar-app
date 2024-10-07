// src/components/EventDetails.js
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import useEvents from '../hooks/useEvents';
import Modal from './Modal';
import EventForm from './EventForm';

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
    background-color: ${props => props.delete ? '#dc3545' : '#007bff'};
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
`;

const EventDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate(); // useNavigate used instead of useHistory
    const { events, deleteEvent } = useEvents();
    const event = events.find(evt => evt.id === parseInt(id));

    const [showEditModal, setShowEditModal] = useState(false);

    if (!event) {
        return <p>Event not found.</p>;
    }

    const handleDelete = () => {
        deleteEvent(event.id);
        navigate('/'); // Using navigate to redirect
    };

    const openEditModal = () => {
        setShowEditModal(true);
    };

    const closeEditModal = () => {
        setShowEditModal(false);
    };

    return (
        <DetailsContainer>
            <h2>{event.title}</h2>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Category:</strong> {event.category}</p>
            <p><strong>Description:</strong> {event.description}</p>
            <div>
                <Button onClick={openEditModal}>Edit</Button>
                <Button delete onClick={handleDelete}>Delete</Button>
            </div>
            {showEditModal && (
                <Modal onClose={closeEditModal}>
                    <EventForm existingEvent={event} onClose={closeEditModal} />
                </Modal>
            )}
        </DetailsContainer>
    );
};

export default EventDetails;