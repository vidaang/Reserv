import React from 'react';
import NavBar from '../components/NavBar';
import '../index.css';

function LandingPage()
{
    return (
        <div id="LandingPageDiv">
            <div id="NavBar">
                <NavBar />
            </div>
            <h1 id="user-authetication-title">Book Your Path to Knowledge: University Room Reservations</h1>
        </div>
    );
}

export default LandingPage;