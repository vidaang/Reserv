import React from 'react';
import "../../../styles/index.css";
import { Link } from 'react-router-dom';

function EditReservationsForm() {
    const handleEditReservation = () => {
        // API CALL TO EDIT RESERVATION
    };

    return (
        <div id="CompleteProfileContainer">
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
            <label htmlFor="startTime">Start Time:</label>
            <input type="text" id="startTime" placeholder="Enter Start Time" />
        </div>
        <div className="complete-reservation-input-label">
            <label htmlFor="endTime">End Time:</label>
            <input type="text" id="endTime" placeholder="Enter End Time" />
        </div>
        <div className="complete-reservation-input-label">
            <label htmlFor="cleanupTime">Cleanup Time:</label>
            <input type="text" id="cleanupTime" placeholder="Enter Cleanup Time" />
        </div>
        <span id="complete-reservation-discretion-text">I understand that if the date I selected above 
        is less than 7 business days in the future, it is unlikely that my request will be reviewed in 
        time for my event. I also understand that the Registrar's Office is unable to accept rush 
        requests.</span>
        <label id="complete-reservation-checkbox-message">
            <input type="checkbox" id="complete-reservation-checkbox" />
            I understand and agree to the statement above
        </label>
        <div id="CompleteProfileButtonDiv">
            <Link to="/OrgReservationsPage">
                <button id="complete-reservation-cancel-button">Cancel</button>
            </Link>
            <button id="complete-reservation-create-button" onClick={handleEditReservation}>Confirm Changes</button>
        </div>
        </div>
    );
}

export default EditReservationsForm;
