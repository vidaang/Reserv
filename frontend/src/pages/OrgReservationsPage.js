import React, { useState } from 'react';
import NavBar from '../components/NavBar';
import '../index.css';
import PendingReservations from '../components/PendingReservations';
import ApprovedReservations from '../components/ApprovedReservations';
import DeniedReservations from '../components/DeniedReservations';

function OrgReservationsPage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

    const [selectedOption, setSelectedOption] = useState(null);
      
    const handleOptionChange = (event) => {
        setSelectedOption(event.target.value);
    };

    let selectedComponent;

    switch (selectedOption) {
        case 'pending':
            selectedComponent = <PendingReservations />;
            break;
        case 'denied':
            selectedComponent = <DeniedReservations />;
            break;
        case 'approved':
            selectedComponent = <ApprovedReservations />;
            break;
        default:
            selectedComponent = null;
    }

    return (
        <div id="OrgReservationsPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            <nav id="reservations-navbar">
                <label>
                    <input type="radio" value="pending" checked={selectedOption === 'pending'} onChange={handleOptionChange}/>
                    Pending
                    <div className="reservation-select-bar"></div> 
                </label>
                <label>
                    <input type="radio" value="approved" checked={selectedOption === 'approved'} onChange={handleOptionChange}/>
                    Approved
                    <div className="reservation-select-bar"></div> 
                </label>
                <label>
                    <input type="radio" value="denied" checked={selectedOption === 'denied'} onChange={handleOptionChange}/>
                    Denied
                    <div className="reservation-select-bar"></div> 
                </label>                  
            </nav>
            <div className="reservation-select-bar"></div> 
            <div id="reservations-list-div">
                {selectedComponent}
            </div>
        </div>
    );
}

export default OrgReservationsPage;