import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Map from '../../components/Org/OrgSearchPage/Map'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ChangeViewButton from "../../components/Org/OrgSearchPage/ChangeViewButton";
import RoomList from "../../components/Org/OrgSearchPage/RoomList";


import '../../styles/index.css';

function OrgSearchPage()
{
    const [isMapView, setIsMapView] = useState(true);
    const [isListOpen, setListOpen] = useState(false);
  
    const toggleList = () => {
        setListOpen(!isListOpen);
    };

    const mapContainerClass = `map-container${isListOpen ? ' slide-right' : ''}`;
    const listClass = `list${isListOpen ? ' slide-right' : ''}`;

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
                <div className={mapContainerClass}>
                    <Map />
                </div>
                <ChangeViewButton
                    toggleList={toggleList}
                    isMapView={isMapView}
                />
                {isListOpen && (
                    <div className={listClass}>
                        <div className="list-container">
                            <RoomList /> 
                        </div>
                    </div>
                )}
            </div>
            
            {/* <div>
                <Row>
                    <Col lg={{ span: 2 }}>
                        <div id="RoomList">
                            <RoomList/>
                        </div>                   
                    </Col>
                    <Col lg={{ span: 10 }}>
                        <div id="map-container">
                            <Map/>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div>
                <RoomDetails/>
            </div> */}
            
            
            
        </div>
    );
}

export default OrgSearchPage;