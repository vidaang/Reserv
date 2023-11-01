import React from 'react';
import VerificationList from '../../components/Uni/UniVerificationPage/VerificationList';
import NavBar from '../../components/NavBar';
import "../../styles/index.css";

const orgs = [ // Dummy Orgs
    {
        name: "IEEE",
        officer: "John Engineer",
        email: "john@ucf.edu",
        phone: "111-111-1111",
        advisor: "IEEE Advisor",
        advisor_email: "advisor@ucf.edu"
    },
    {
        name: "Esports",
        officer: "James Esport",
        email: "james@ucf.edu",
        phone: "111-111-1111",
        advisor: "Esports Advisor",
        advisor_email: "advisor@ucf.edu"
    }
]
// Get orgs based on boolean database "verified" value, send list of orgs to VerificationList
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