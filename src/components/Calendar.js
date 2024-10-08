// src/components/Calendar.js
import React, { useState } from "react";
import styled from "styled-components";
import useEvents from "../hooks/useEvents";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import EventForm from "./EventForm";

const CalendarContainer = styled.div`
  max-width: 800px;
  margin: 20px auto;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  background-color: #fff;

  ${({ themeMode }) =>
    themeMode === "dark" &&
    `
  background-color: #333;
  color: white;
`}
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Button = styled.button`
  padding: 5px 10px;
  margin: 5px;
  border: none;
  background-color: #007bff;
  color: #fff;
  border-radius: 4px;
  cursor: pointer;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
  padding: 10px 0;
`;

// const Day = styled.div`
//   padding: 10px;
//   background-color: ${(props) =>
//     props.isCurrentMonth ? "#e6e6e6" : "transparent"};
//   border: 1px solid #ccc;
//   border-radius: 5px;
//   min-height: 80px;
//   position: relative;
//   cursor: pointer;

//   &:hover {
//     background-color: #dcdcdc;
//   }

//   ${(props) =>
//     props.hasEvent &&
//     `
//         background-color: #007bff;
//         color: white;
//     `}
// `;

// const EventBadge = styled.span`
//   display: block;
//   background-color: ${(props) => props.color || "#28a745"};
//   color: #fff;
//   padding: 2px 5px;
//   border-radius: 3px;
//   font-size: 0.8rem;
//   margin-top: 5px;
//   text-decoration: none;
// `;
const Day = styled.div`
  padding: 10px;
  background-color: ${(props) =>
    props.isCurrentMonth ? "#f9f9f9" : "transparent"};
  border: 1px solid #ccc;
  border-radius: 5px;
  min-height: 100px; // Adjust the height for better spacing
  position: relative;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: space-between; // Aligns the date and events

  &:hover {
    background-color: #e6e6e6;
  }

  ${(props) =>
    props.hasEvent &&
    `
      background-color: #007bff;
      color: white;
    `}
`;

const EventBadge = styled.span`
  display: block;
  background-color: ${(props) => props.color || "#28a745"};
  color: #fff;
  padding: 4px 6px;
  border-radius: 3px;
  font-size: 0.75rem;
  margin-top: 4px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const ExtraEvents = styled.div`
  font-size: 0.75rem;
  color: white;
  background-color: rgba(255, 255, 255, 0.2);
  padding: 2px 6px;
  border-radius: 3px;
  margin-top: 5px;
  text-align: center;
`;

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showModal, setShowModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const { events, loading, error, addEvent } = useEvents(); // Ensure addEvent is destructured

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const generateCalendar = () => {
    const days = [];
    const totalDays = daysInMonth(currentMonth, currentYear);
    const firstDay = firstDayOfMonth(currentMonth, currentYear);

    // Add empty days for the first week
    for (let i = 0; i < firstDay; i++) {
      days.push(<Day key={`empty-${i}`} isCurrentMonth={false}></Day>);
    }

    // Add actual days
    for (let day = 1; day <= totalDays; day++) {
      const date = new Date(currentYear, currentMonth, day + 1);
      const dayEvents = events.filter((event) => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.toDateString();
      });
      // Sort events by date and limit to 2 latest events
      const sortedDayEvents = dayEvents.sort(
        (a, b) => new Date(a.date) - new Date(b.date)
      );
      const visibleEvents = sortedDayEvents.slice(0, 2); // Show only the first two events
      const additionalEventCount =
        sortedDayEvents.length - visibleEvents.length;

      days.push(
        <Day
          key={day}
          isCurrentMonth={true}
          hasEvent={dayEvents.length > 0}
          onClick={() => handleDayClick(date)}
        >
          <span>{day}</span>
          {visibleEvents.map((event) => (
            <Link to={`/event/${event.id}`} key={event.id}>
              <EventBadge color={getEventColor(event.category)}>
                {event.title}
              </EventBadge>
            </Link>
          ))}
          {/* Show +X if there are more than two events */}
          {additionalEventCount > 0 && (
            <ExtraEvents>+{additionalEventCount} more</ExtraEvents>
          )}
        </Day>
      );
    }
    return days;
  };

  const getEventColor = (category) => {
    switch (category) {
      case "Work":
        return "#007bff"; // Blue
      case "Personal":
        return "#28a745"; // Green
      case "Others":
        return "#ffc107"; // Yellow
      default:
        return "#17a2b8"; // Teal
    }
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedDate(null);
  };

  return (
    <CalendarContainer>
      <Header>
        <Button onClick={prevMonth}>Previous</Button>
        <h2>
          {months[currentMonth]} {currentYear}
        </h2>
        <Button onClick={nextMonth}>Next</Button>
      </Header>
      {loading && <p>Loading events...</p>}
      {error && <p>{error}</p>} {/* Error handling */}
      <Grid>
        {/* Week Days Headers */}
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <strong key={day}>{day}</strong>
        ))}
        {/* Calendar Days */}
        {generateCalendar()}
      </Grid>
      {showModal && (
        <Modal onClose={closeModal}>
          <EventForm selectedDate={selectedDate} onClose={closeModal} />
        </Modal>
      )}
    </CalendarContainer>
  );
};

export default Calendar;
