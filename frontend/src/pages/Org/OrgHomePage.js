import React, { useEffect, useState } from 'react';
import NavBar from '../../components/NavBar';
import OrgSearchRoomsForm from '../../components/Org/OrgHomePage/OrgSearchRoomsForm';
import Lecture1 from '../../images/lecture-hall-1.jpg';
import Lecture2 from '../../images/lecture-hall-2.jpg';
import Lecture3 from '../../images/lecture-hall-3.jpg';
import Lecture4 from '../../images/lecture-hall-4.jpg';
import '../../styles/index.css';

function OrgHomePage()
{
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        // CALL API REQUEST HERE!

        const mockReservations = [
            {
                id: 1,
                title: "Mock Foundation Exam",
                location: "Classroom Building 1 Rm 101",
                time: "1:30PM-4:30PM",
                image: Lecture1,
            },
            {
                id: 2,
                title: "Mock Foundation Exam",
                location: "Classroom Building 1 Rm 101",
                time: "1:30PM-4:30PM",
                image: Lecture2,
            },
            {
                id: 3,
                title: "Mock Foundation Exam",
                location: "Classroom Building 1 Rm 101",
                time: "1:30PM-4:30PM",
                image: Lecture3,
            },
            {
                id: 4,
                title: "Mock Foundation Exam",
                location: "Classroom Building 1 Rm 101",
                time: "1:30PM-4:30PM",
                image: Lecture4,
            },

        ];

        setReservations(mockReservations);
    }, []);

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
                            {reservations.map((reservation) => (
                                <div className="org-home-card" key={reservation.id}>
                                    <img src={reservation.image} alt={reservation.title} className="org-home-card-img" />
                                    <p>{reservation.title}</p>
                                    <p>{reservation.location}</p>
                                    <p>{reservation.time}</p>
                                </div>
                            ))}
                        </div>
                        <div className="org-home-card-arrow" id="next">&#9654;</div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrgHomePage;