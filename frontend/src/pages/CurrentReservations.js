import React from 'react';
import { Link } from 'react-router-dom';

function CurrentReservations(){
    return(
        <div id="reservations-page">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="reservations-header">
                <h1>Your Reservations</h1>
            </div>
            <div id="reservations-navbar">
                <div id="reservations-left-content">
                    <Link to="/OrgHomePage">
                        <button id="reservations-back-button">Home</button>
                    </Link>
                </div>
                <div id="reservations-center-content">
                    <button id="pending-reservations-button">Pending</button>
                    <button id="approved-reservations-button">Approved</button>
                    <button id="denied-reservations-button">Denied</button>
                </div>
            </div>
            <div id="reservations-list-div">
            </div>
        </div>
    );
}

export default CurrentReservations;