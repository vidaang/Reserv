import React from 'react';
import NavBar from '../components/NavBar';
import Map from '../components/Org/OrgSearchPage/Map'
import '../index.css';

function OrgSearchPage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

    return (
        <div id="OrgSearchPageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
            
            <div id='MapSection'>
                <Map />
            </div>
            <div id="ListSection">
                <h1>Hello</h1>
            </div>
            
        </div>
    );
}

export default OrgSearchPage;