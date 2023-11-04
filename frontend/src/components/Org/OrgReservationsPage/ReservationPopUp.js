import React from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';

function ReservationPopUp({ event }) {

    const formattedDate = format(event.date, "MMMM d, yyyy");
    const formattedStart = format(event.start, "H:mm");
    const formattedEnd = format(event.end, "H:mm");

    const handleEditReservation = () => {
        
    }
    const handleCancelReservation = () => {
        // API CALL TO DELETE RESERVATION
        alert("Cancel reservation clicked");
    }

    return (
        <div id="reservation-popup">
            <div id="reservation-popup-content">
                <h2>{event.title}</h2>
                <p>Date: {formattedDate}</p>
                <p>Room: {event.room}</p>
                <p>Start Time: {formattedStart}</p>
                <p>End Time: {formattedEnd}</p>
            </div>
            <div id="reservation-popup-button-container">
                <Link to="/OrgEditReservationsPage">
                    <button id="popup-edit-button" onClick={handleEditReservation}>Edit Reservation</button>
                </Link>
                <button id="popup-cancel-button" onClick={handleCancelReservation}>Cancel Reservation</button>
            </div>
        </div>
    )
}

export default ReservationPopUp;