import React from 'react';
import NavBar from '../../components/NavBar';
import '../../styles/index.css';

function UniHomePage()
{
    return (
        <div id="UniHomePageDiv">
            <link rel="preconnect" href="https://fonts.googleapis.com"/>
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
            <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
            <div id="NavBar">
                <NavBar />
            </div>
        </div>
    );
}

export default UniHomePage;