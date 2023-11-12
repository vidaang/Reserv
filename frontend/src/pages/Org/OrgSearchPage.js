import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Map from '../../components/Org/OrgSearchPage/Map'
import Row from 'react-bootstrap/Row';
import ChangeViewButton from "../../components/Org/OrgSearchPage/ChangeViewButton";
import RoomList from "../../components/Org/OrgSearchPage/RoomList";
import SearchBar from '../../components/Org/OrgSearchPage/SearchBar';

import '../../styles/index.css';

function OrgSearchPage()
{
    const [isMapView, setIsMapView] = useState(true);
    const [isListOpen, setListOpen] = useState(true);
  
    // const toggleList = async () => {
    //     setListOpen(!isListOpen);
    // };

    const searchBarContainer = `map-container${isListOpen ? ' slide-right' : ''}`;
    //const mapContainerClass = `map-container${isListOpen ? ' slide-right' : ''}`;

    return (
        <div id="OrgSearchPageDiv">
            <div >
                <Row>
                    <link rel="preconnect" href="https://fonts.googleapis.com"/>
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                    <link href="https://fonts.googleapis.com/css2?family=Gabarito:wght@400;700&display=swap" rel="stylesheet"></link>
                    <div id="NavBar">
                        <NavBar />
                    </div>  
                </Row>
            </div>

            <div id='MapView'>
                <div className={isListOpen ? "searchBarContainer slide-right-search" : "searchBarContainer"}>
                    <SearchBar />
                </div>
                
                <div id="map-container">
                    <Map isListOpen={isListOpen}/>
                </div>
            </div>
        </div>
    );
}

export default OrgSearchPage;