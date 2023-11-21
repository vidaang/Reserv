import React from 'react';
import { Link } from 'react-router-dom';
import EmailArt from "../../images/email-art.png";

function OrgEmailVerification()
{
    return(
        <div id="email-verification-page">
            <div id="email-verification-container">
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
                <h1>Account email has been verified!</h1>
                <img src={EmailArt} alt="Email Clipart" id="email-verification-art"></img>
                <Link to="/OrgLogin">
                    <span>Click here to login</span>
                </Link>
            </div>
        </div>
    );
}

export default OrgEmailVerification;