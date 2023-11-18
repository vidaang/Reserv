import { React, useState } from 'react';
import { format } from "date-fns";
import { Link } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';
import '../../../styles/index.css';

function ReservationPopUp({ event }) {

    const formattedDate = format(event.date, "MMMM d, yyyy");
    const formattedStart = format(event.start, "h:mm a");
    const formattedEnd = format(event.end, "h:mm a");

    const eventID = event.eventID;

    const [opened, { open, close }] = useDisclosure(false);
    const [displayEdit, setDisplayEdit] = useState(false);

    const openEditModal = () => {
        setDisplayEdit(true);
        open();
    }

    const openDeleteModal = () => {
        setDisplayEdit(false);
        console.log("Cancelling..." + eventID);
        open();
    }

    var eventName;
    var eventDescription;


    const handleCancelReservation = async () => {
        setDisplayEdit(false);
        if (!eventID)
        {
            return;
        }

        var obj = { EventID:eventID };
        var js = JSON.stringify(obj);
        console.log(js);
        try
        {
            const response = await fetch('http://localhost:5000/api/DeleteEvent',
            {method:'DELETE',
            body:js,
            headers:{'Content-Type':'application/json'}});
        }
        catch(e)
        {
            alert(e.toString());
            return;
        }

        window.location.reload();
    };

    return (
        <div id="reservation-popup">
            <div id="reservation-popup-content">
                <h2>{event.title}</h2>
                <p>Date: {formattedDate}</p>
                <p>Room: {event.room}</p>
                <p>Time: {formattedStart} - {formattedEnd}</p>
                <p>Description: {event.description}</p>
            </div>
            <div id="reservation-popup-button-container">
                <button id="popup-cancel-button" onClick={openDeleteModal}>Cancel Reservation</button>
            </div>
            <Modal id="reservation-modal" opened={opened} onClose={close}>
                {displayEdit ? (
                    <div id="edit-modal-container">
                        <div id="EditReservationContainer">
                            <div className="complete-reservation-input-label">
                                <label htmlFor="eventName">Event Name:</label>
                                <input type="text" id="eventName" placeholder="Enter Event Name" ref={(c) => eventName = c} required/><br />
                            </div>
                            <div className="complete-reservation-input-label">
                                <label htmlFor="eventDescription">Description:</label>
                                <input type="text" id="eventDescription" placeholder="Enter Event Description" ref={(c) => eventDescription = c} required/><br />
                            </div>
                        </div>
                    </div> ) : (
                    <div id="cancel-modal-container">
                        <h1>Are you sure you want to cancel this reservation?</h1>
                        <div id="cancel-modal-buttons">
                            <button id="cancel-back-button" onClick={close}>Back</button>
                            <button id="cancel-confirm-button" onClick={handleCancelReservation}>Confirm</button>
                        </div>
                    </div>
                )}
            </Modal>
        </div>
    )
}

export default ReservationPopUp;