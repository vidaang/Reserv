import React from 'react';
import OrgCompleteProfile from '../../components/Org/OrgProfilePage/OrgCompleteProfile';
import "../../styles/index.css";


function OrgProfilePage()
{
    return (
        <div id="OrgHomePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <h1>Complete Your Profile</h1>
            <div id="UniProfileComponentDiv">
                <OrgCompleteProfile />
            </div>
        </div>
    );
}

export default OrgProfilePage;