import React from 'react';
import EditReservationsForm from '../../components/Org/OrgReservationsPage/EditReservationsForm';
import "../../styles/index.css";


function OrgEditReservationPage()
{
    return (
        <div id="OrgEditReservationsPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <h1>Edit Your Reservation</h1>

            <EditReservationsForm />
        </div>
    );
}

export default OrgEditReservationPage;