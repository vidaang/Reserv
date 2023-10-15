import React from 'react';
import NavBar from '../components/NavBar';
import OrgSearchRoomsForm from '../components/OrgSearchRoomsForm';
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
            <div id="org-home-page-div">
                <div id="org-home-container">
                    <h2 id="sub-title">Current Reservations</h2>
                    
                    <div className="org-home-box">
                        <h3>No current reservations!</h3>
                    </div>
                </div>
                
                <div id="org-home-container">
                    <h2 id="sub-title">Search for Rooms</h2>
                    
                    <div className="org-home-box">
                        <form className="entry-form">
                            <OrgSearchRoomsForm />
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrgHomePage;