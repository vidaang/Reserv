import React from 'react';
import NavBar from '../components/NavBar';
import OrgSearchRoomsForm from '../components/Org/OrgHomePage/OrgSearchRoomsForm';
import Lecture1 from '../images/lecture-hall-1.jpg';
import Lecture2 from '../images/lecture-hall-2.jpg';
import Lecture3 from '../images/lecture-hall-3.jpg';
import Lecture4 from '../images/lecture-hall-4.jpg';
import '../styles/index.css';

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
                
                <div id="org-top-container">
                    <h1 id="main-title">Search for Rooms</h1>
                    
                    <div className="org-home-box">
                        <form className="entry-form">
                            <OrgSearchRoomsForm />
                        </form>
                    </div>
                </div>

                <div id="org-bottom-container">
                    <h2 id="sub-title">Current Reservations</h2>
                    
                    <div className="org-home-box">
                        <div className="org-home-card-arrow" id="org-home-card-prev ">&#9664;</div>
                            <div className="org-home-card-container">
                                <div className="org-home-card">
                                    <img src={ Lecture1 } alt="Card 1"className="org-home-card-img"/>
                                    <p1>Mock Foundation Exam</p1>
                                    <p1>Classroom Building 1 Rm 101</p1>
                                    <p1>1:30PM-4:30PM</p1>
                                </div>
                                <div className="org-home-card">
                                    <img src={ Lecture2 } alt="Card 2"className="org-home-card-img"/>
                                    <p1>Building MERN Stack Workshop</p1>
                                    <p1>Classroom Building 1 Rm 101</p1>
                                    <p1>9:00AM-2:00PM</p1>
                                </div>
                                <div class="org-home-card">
                                    <img src={ Lecture3 } alt="Card 3"className="org-home-card-img"/>
                                    <p1>Running a Ponzi Scheme 101</p1>
                                    <p1>Classroom Building 2 Rm 201</p1>
                                    <p1>3:15PM-5:00PM</p1>
                                </div>
                                <div className="org-home-card">
                                    <img src={ Lecture4 } alt="Card 4"className="org-home-card-img"/>
                                    <p1>Scooby Doo Movie Marathon</p1>
                                    <p1>Classroom Building 2 Rm 201</p1>
                                    <p1>8:30PM-11:30PM</p1>
                                </div>
                            </div>
                        <div className="org-home-card-arrow" id="next">&#9654;</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrgHomePage;