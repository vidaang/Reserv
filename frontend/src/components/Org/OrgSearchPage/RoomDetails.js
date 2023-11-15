import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import '../../../styles/index.css';
import { format } from "date-fns";
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
  const [intervals, setIntervals] = useState(0);
  const [roomDetails, setRoomDetails] = useState(null);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [formattedAvailability, setFormattedAvailability] = useState([]);
  const [timeRange, setTimeRange] = useState({ hours: 0, minutes: 30 });

  const getAvailability = async () => {
    var date = selectedDate.split('-');
    var apiFormattedDate = date[1] + '-' + date[2] + '-' + date[0];
    console.log(formattedDate);
    console.log(intervals);
    console.log(room.RoomID);

    var response;
    
    try
    {  
       response = await fetch(`http://localhost:5000/api/availability/${room.RoomID}/${apiFormattedDate}/${intervals}`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': 'temp'
        }
      });
    }
    catch (error)
    {
      console.error(error);
    }
    
    const data = await response.json();
    console.log(data);
    setAvailableTimes(data.continuousAvailability);
    formatAvailability(data.continuousAvailability);
  };

  const formatDate = () => {
    var date = selectedDate.split('-');
    var year = date[0];
    var month = date[1];
    var day = date[2];

    return format(new Date(year, month - 1, day), "MMMM d, yyyy");
  };

  const formatAvailability = (availability) => {
    var formattedAvailability = [];
    availability.forEach(timeSlot =>{
      var start;
      if (timeSlot.start % 1 === 0.5)
        start = new Date(0, 0, 0, timeSlot.start, 30, 0);
      else
        start = new Date(0, 0, 0, timeSlot.start, 0, 0);
      var end;
      if (timeSlot.end % 1 === 0.5)
        end = new Date(0, 0, 0, timeSlot.end, 30, 0);
      else
        end = new Date(0, 0, 0, timeSlot.end, 0, 0);

      var formattedStart = format(start, "h:mm a");
      var formattedEnd = format(end, "h:mm a");
      var availString = formattedStart + " - " + formattedEnd;
      formattedAvailability.push(availString);
    });
    setFormattedAvailability(formattedAvailability);
  };

  const handleDateChange = (e) => {
      setSelectedDate(e.target.value);
  };

  const handleTimeRangeChange = (e) => {
      const minutes = parseInt(e.target.value, 10);
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      setTimeRange({ hours, minutes: remainingMinutes });
      setIntervals(minutes / 30);
  };

  const handleSubmit = (e) => {
      e.preventDefault();
      setFormattedDate(formatDate());
      getAvailability();
      // console.log("Date:", selectedDate);
      // console.log("Time Range:", `${timeRange.hours} hours, ${timeRange.minutes} minutes`);
      // console.log("# of Intervals = " + intervals);
  };
  
  const formatRoomData = (room) => {
    var details = {
      buildingName: room.BuildingID,
      roomNumber: room.RoomNumber,
      capacity: 250,
    }
    return details;
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
    // setAvailableTimes(new Set());
    var roomData = formatRoomData(room);
    setRoomDetails(roomData);
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

            {/*Date and Time Search Form*/}
            <form onSubmit={handleSubmit}>
              <div className="entry-form-container">
                  <div className="entry-form-row">
                      <label htmlFor="dateRangeStart">Date:</label>
                      <div className="entry-form-input">
                          <input
                              type="date"
                              id="dateRangeStart"
                              name="dateRangeStart"
                              required
                              value={selectedDate}
                              onChange={handleDateChange}
                          />
                      </div>
                  </div>

                  <div className="entry-form-row">
                      <div className="entry-form-input">
                          <label htmlFor="timeRange">Time Range:</label>
                          <input
                              type="range"
                              id="timeRange"
                              name="timeRange"
                              min="30"
                              max="1380"
                              step="30"
                              value={timeRange.hours * 60 + timeRange.minutes}
                              onChange={handleTimeRangeChange}
                          />
                          <output htmlFor="timeRange">
                              {timeRange.hours} hours, {timeRange.minutes} minutes
                          </output>
                      </div>
                  </div>
                  <input type="submit" value="Submit" className="search-bar-submit"/>
              </div>
          </form>
            {/* Available Times Section */}
            <div className="availableTimesSection">
              <div id="availableTimesHeading">
                <h5 className="available-times">AVAILABLE TIMES</h5>
              </div>
                <div>
                  <div id="availableTimesDayHeading">
                    <h3>{formattedDate}</h3>
                  </div>
                  <div id="availableTimesDayButton">
                    {formattedAvailability.map((time, index) => (
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
