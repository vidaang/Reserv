import React from 'react';
import NavBar from '../components/NavBar';
import '../index.css';

function OrgProfilePage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

    return (
        <div id="OrgProfilePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            <header id="landing-header">
                <h1 id="main-title">Profile Page</h1>
                <h2 id="sub-title">Currently in Progress!</h2>
            </header>
        </div>
    );
}

export default OrgProfilePage;