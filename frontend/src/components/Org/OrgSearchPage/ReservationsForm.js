import React from 'react';
import "../../../styles/index.css";
import { Link } from 'react-router-dom';

function ReservationsForm() {
    const handleCreateReservation = () => {
        // API CALL TO CREATE RESERVATION
    };

    return (
        <div id="CompleteReservationContainer">
            <div className="complete-reservation-input-label">
                <label htmlFor="eventName">Event Name:</label>
                <input type="text" id="eventName" placeholder="Enter Event Name" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventType">Event Type:</label>
                <input type="text" id="eventType" placeholder="Enter Event Type" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventDescription">Event Description:</label>
                <input type="text" id="eventDescription" placeholder="Enter Event Description" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventAttendees">Number of Attendees:</label>
                <input type="text" id="eventAttendees" placeholder="Enter Number of Attendees" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventAtriumLobby">Atrium or Lobby Needed:</label>
                <input type="text" id="eventAtriumLobby" placeholder="Yes/No" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventStart">Event Start Date:</label>
                <input type="text" id="eventStart" placeholder="Enter Start Date" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventRepeat">Event Repeats:</label>
                <input type="text" id="eventRepeat" placeholder="Yes/No" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="eventEnd">Event End Date:</label>
                <input type="text" id="eventEnd" placeholder="Enter End Date" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="setupTime">Setup Time:</label>
                <input type="text" id="setupTime" placeholder="Enter Setup Time" />
            </div>
            <div className="complete-reservation-input-label">
                <label htmlFor="cleanupTime">Cleanup Time:</label>
                <input type="text" id="cleanupTime" placeholder="Enter Cleanup Time" />
            </div>
        </div>
    );
}

export default ReservationsForm;
