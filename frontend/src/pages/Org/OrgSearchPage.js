import React from 'react';
import NavBar from '../../components/NavBar';
import Map from '../../components/Org/OrgSearchPage/Map'
import '../index.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RoomList from "../../components/Org/OrgSearchPage/RoomList"
import RoomDetails from '../../components/Org/OrgSearchPage/RoomDetails';

function OrgSearchPage()
{
    const handleClick = () => {
        alert("Button clicked!");
    }

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
            
            <div>
                <Row>
                    <Col lg={{ span: 2 }}>
                        <div id="RoomList">
                            <RoomList/>
                        </div>                   
                    </Col>
                    <Col lg={{ span: 10 }}>
                        <div id=".map-container">
                            <Map/>
                        </div>
                    </Col>
                </Row>
            </div>
            
            <div>
                <RoomDetails/>
            </div>
            
            
            
        </div>
    );
}

export default OrgSearchPage;