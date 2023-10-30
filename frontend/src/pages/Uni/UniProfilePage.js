import React from 'react';
import UniCompleteProfile from '../../components/Uni/UniCompleteProfile';
import NavBar from '../../components/NavBar';
import "../../styles/index.css";


function UniProfilePage()
{
    return (
        <div id="UniProfilePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <NavBar />
            <h1>Complete Your Profile</h1>
            <div id="UniProfileComponentDiv">
                <UniCompleteProfile />
            </div>
        </div>
    );
}

export default UniProfilePage;