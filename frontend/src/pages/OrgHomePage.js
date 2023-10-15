import React from 'react';
import NavBar from '../components/NavBar';
import '../index.css';

function OrgHomePage()
{
    return (
        <div id="OrgHomePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            <div id="org-home-top-container">
                <header id="landing-header">
                    <h2 id="sub-title">Current Reservations</h2>
                </header>
                <div id="org-home-box">

                </div>
            </div>
            
            <div id="org-home-bottom-container">
                <header id="landing-header">
                    <h2 id="sub-title">Search for Rooms</h2>
                </header>
                <div id="org-home-box">
                    
                </div>
            </div>
        </div>
    );
}

export default OrgHomePage;