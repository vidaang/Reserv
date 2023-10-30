import React from 'react';
import NavBar from '../../components/NavBar';
import '../styles/index.css';
import LargeCalendar from '../../components/Org/OrgReservationsPage/LargeCalendar';


function OrgReservationsPage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

    return (
        <div id="OrgReservationsPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="CalendarDiv">
                <LargeCalendar />
            </div>
        </div>
    );
}

export default OrgReservationsPage;