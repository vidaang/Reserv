import React from 'react';
import ReservationsForm from '../../components/Org/OrgSearchPage/ReservationsForm';
import "../../styles/index.css";


function OrgCompleteReservationPage()
{
    return (
        <div id="OrgCompleteReservationsPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <h1>Complete Your Reservation</h1>

            <ReservationsForm />
        </div>
    );
}

export default OrgCompleteReservationPage;