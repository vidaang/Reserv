import React from 'react';
import { format } from "date-fns";


function ReservationPopUp({ event }) {

    const formattedDate = format(event.date, "MMMM d, yyyy");
    const formattedStart = format(event.start, "H:mm");
    const formattedEnd = format(event.end, "H:mm");

    const handleClick = () => {
        alert("Button time yay!");
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
                <button id="popup-edit-button" onClick={handleClick}>Edit Reservation</button>
                <button id="popup-cancel-button" onClick={handleClick}>Cancel Reservation</button>
            </div>
        </div>
    )
}

export default ReservationPopUp;