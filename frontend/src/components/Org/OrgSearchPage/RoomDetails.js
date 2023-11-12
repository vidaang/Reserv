import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import '../../../styles/index.css';
import {
  IconUsers,
  IconFriends,
  IconDisabled,
  IconSettings,
  IconDeviceDesktop,
} from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import Lecture from '../../../images/lecture-hall-3.jpg';

const localizer = momentLocalizer(moment);

function RoomDetails(props) {
  const { room, handleCloseModal } = props;

  const [view, setView] = useState('month');
  const [roomDetails, setRoomDetails] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  const fillRoomTimes = () => {

  };

  // Simulated dummy data for room details
  const dummyRoomData = {
    buildingName: 'Classroom Building One',
    roomNumber: 'Room 120',
    capacity: 250,
    date: 'Monday, October 2nd, 2023',
    availableTimes: ['6:00am - 8:30am', '9:00am - 10:00am', '12:00pm - 1:30pm'],
  };

  useEffect(() => {
    setRoomDetails(dummyRoomData);
  }, []);

  function handleCreateReservation() {
    // PASS IN ROOM INFORMATION
  }

  return (
    <Modal show={room !== null} onHide={handleCloseModal} dialogClassName="roomDetailsModal">

      <Modal.Header closeButton>
        <Modal.Title>Room Details</Modal.Title>
      </Modal.Header>

      <Modal.Body id="roomDetailsModalBody">
        {roomDetails && (
          <>
            {/* Room Description Section */}
            <div className="roomDescription">
              <div className="roomDescriptionLeft">
                <img src={Lecture} alt="Room Image" className="search-page-modal-img" />
              </div>
              <div className="roomDescriptionRight">
                <div className="location-container">
                  <h5 className="location">LOCATION</h5>
                  <h1 className="building-name">Classroom II</h1>
                  <div className="row-space">
                    <h3>{roomDetails.roomNumber}</h3>
                    <div className="capacity-space">
                      <IconUsers size={30} color="blue" />
                      <h5>{roomDetails.capacity}</h5>
                    </div>
                  </div>
                </div>
                <div className="ammenities-container">
                  <h5 className="ammenities">AMENITIES</h5>
                  <div className="row-space">
                    <IconFriends size={50} color="black" />
                    <IconDisabled size={50} color="black" />
                    <IconDeviceDesktop size={50} color="black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Available Times Section */}
            <div className="availableTimesSection">
              <div id="availableTimesHeading">
                <h5 className="available-times">AVAILABLE TIMES</h5>
              </div>
                <div>
                  <div id="availableTimesDayHeading">
                    <h3>{roomDetails.date}</h3>
                  </div>
                  <div id="availableTimesDayButton">
                    {roomDetails.availableTimes.map((time, index) => (
                      <Button
                        key={index}
                        id={`timeButton${index}`}
                        className="availableTimeDayButton"
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
            </div>
          </>
        )}
      </Modal.Body>

      <Modal.Footer>
        <Link to="/OrgCompleteReservationPage">
          <Button
            id="CreateReservationButton"
            variant="primary"
            onClick={handleCreateReservation}
          >
            Create Reservation
          </Button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default RoomDetails;
