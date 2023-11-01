import React from 'react';
import VerificationList from '../../components/Uni/UniVerificationPage/VerificationList';
import NavBar from '../../components/NavBar';
import "../../styles/index.css";

const orgs = [ // Change to Reservation
    {
        name: "IEEE",
        officer: "John Engineer",
        email: "john@ucf.edu"
    },
    {
        name: "Esports",
        officer: "James Esport",
        email: "james@ucf.edu"
    }
]

function UniVerificationPage()
{
    return (
        <div>
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <NavBar />
            <h1 id="verification-page-header">Verification Page</h1>          
            <VerificationList orgs={ orgs } />          
        </div>
    );
}

export default UniVerificationPage;