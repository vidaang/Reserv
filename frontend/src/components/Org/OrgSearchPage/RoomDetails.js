import React, {Component, useState} from 'react';
import {Row, Col, Dropdown, DropdownButton, } from "react-bootstrap";
import { Modal, Button } from 'react-bootstrap';
import "../../../index.css";

function RoomDetails(){
    const [showModal, setShowModal] = useState(true);

    function handleCloseModal() {
        setShowModal(false);
    }

    return(    
        <div>
            <Modal dialogClassName="roomDetailsModal" centered show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Room Details</Modal.Title>
                </Modal.Header>
                <Modal.Body id="roomDetailsModalBody">
                    <div id='timePeriodSelector'>
                        <DropdownButton title="Dropdown button" id="dropdown-basic-button">
                            <Dropdown.Item eventKey="X">View By Month</Dropdown.Item>
                            <Dropdown.Divider></Dropdown.Divider>
                            <Dropdown.Item eventKey="X">View By Week</Dropdown.Item>
                        </DropdownButton>
                    </div>
                    <div id="availableTimesSection">
                        <div id="availableTimesHeading">
                            <h1>AvailableTimes</h1>
                        </div>
                        <hr/>
                        <div id="availableTimesDay">
                            <div id='availableTimesDayHeading'>
                                <h3>Monday October 2nd</h3>
                            </div>
                            
                            <div id="availableTimesDayButton">
                                <Button id="timeButton1" className='availableTimeDayButton'>6:00am - 8:30am</Button>
                                <Button id="timeButton2" className='availableTimeDayButton'>9:00am - 10:00am</Button>
                                <Button id="timeButton3" className='availableTimeDayButton'>12:00pm - 1:30pm</Button>
                            </div>
                            <hr/>
                            <div id='availableTimesDayHeading'>
                                <h3>Monday October 3rd</h3>
                            </div>
                            
                            <div id="availableTimesDayButton">
                                <Button id="timeButton1" className='availableTimeDayButton'>6:00am - 8:30am</Button>
                                <Button id="timeButton2" className='availableTimeDayButton'>9:00am - 10:00am</Button>
                                <Button id="timeButton3" className='availableTimeDayButton'>12:00pm - 1:30pm</Button>
                            </div>
                            <hr/>
                        </div>
                    </div>
                    
                </Modal.Body>
                <Modal.Footer>

                    <Button id="CreateReservationButton" variant="primary" onClick={handleCloseModal}>
                        Create Reservation
                    </Button>
                    
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default RoomDetails