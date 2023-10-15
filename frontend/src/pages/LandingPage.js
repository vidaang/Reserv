import React from 'react';
import NavBar from '../components/NavBar';
import '../index.css';

function LandingPage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

    return (
        <div id="LandingPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            <header id="landing-header">
                <h1 id="main-title">Book Your Path to Knowledge</h1>
                <h2 id="sub-title">University Room Reservations</h2>
            </header>
            <div id="landing-button-container">
                <button id="landing-university-button" onClick={handleClick}>I'm a University</button>
                <button id="landing-reserve-button" onClick={handleClick}>Reserve a Room</button>   
            </div>
        </div>
    );
}

export default LandingPage;