import React from 'react';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import EmailArt from "../../images/email-art.png";

function OrgEmailVerification()
{

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const token = searchParams.get('token');

    const verifyAccount = async () => {
        
        console.log(token);
        var obj = { token:token };
        var js = JSON.stringify(obj);
        console.log(js);

        try {
            //await fetch('http://localhost:5000/api/verify-email',
            await fetch('https://knightsreserv-00cde8777914.herokuapp.com/api/verify-email',
              {
                method: 'POST',
                body: js,
                headers: { 'Content-Type': 'application/json' }
            });
        }
          catch (e) {
            console.log(e.toString());
            return;
        }
    };

    useEffect(() => {
        verifyAccount();
    }, []);

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