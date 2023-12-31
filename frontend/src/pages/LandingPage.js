import React from 'react';
import NavBar from '../components/NavBar';
import '../styles/index.css';

function LandingPage()
{
    const handleUniClick = () => {
        window.location.href = "/UniLogin";
    }
    const handleOrgClick = () => {
        window.location.href = "/OrgLogin";
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
                <button id="landing-university-button" onClick={handleUniClick}>I'm a University</button>
                <button id="landing-reserve-button" onClick={handleOrgClick}>I'm a Organization</button>   
            </div>
        </div>
    );
}

export default LandingPage;