import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { DropdownButton, Dropdown, Modal, Button } from 'react-bootstrap';
import ReservationsForm from './ReservationsForm';
import '../../../styles/index.css';
import { format, setDate } from "date-fns";
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
  const [showEventForm, setShowEventForm] = useState(false);
  const [formattedDate, setFormattedDate] = useState(null);
  const [selectedDate, setSelectedDate] = useState();
  const [dateForCreate, setDateForCreate] = useState();
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedTime, setSelectedTime] = useState(null);
  const [formattedAvailability, setFormattedAvailability] = useState([]);
  const [timeRange, setTimeRange] = useState({ hours: 0, minutes: 30 });


  var storedData = JSON.parse(localStorage.getItem("userInfo"));
  var userToken = localStorage.getItem("userToken");

  const getAvailability = async () => {
    var date = selectedDate.split('-');
    var apiFormattedDate = date[1] + '-' + date[2] + '-' + date[0];
    console.log(formattedDate);
    console.log(intervals);
    console.log(room.RoomID);

    var response;
    
    try
    {  
       response = await fetch(`https://knightsreserv-00cde8777914.herokuapp.com/api/availability/${room.RoomID}/${apiFormattedDate}/${intervals}`, {
       // response = await fetch(`http://localhost:5000/api/availability/${room.RoomID}/${apiFormattedDate}/${intervals}`, {
        method: 'GET',
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${userToken}`,
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

    setDateForCreate(month + "-" + day + "-" + year);
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
      capacity: room.Capacity,
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

  var eventName;
  var eventType;
  var numAttendees;
  var description;
  var atriumOccupy; // CHANGE THIS
  var atriumBuilding = room.BuildingID;
  var startEnd = [];
  var eventAgreement; // CHANGE THESE
  var mediaEquip;
  var RSOID = JSON.parse(localStorage.getItem("userInfo")).RSOID;
  var roomID = room.RoomID;

  const createEvent = async (time) => {
    console.log("Creating event...")

    startEnd = [time.start, time.end];

    var obj = {
      Date: dateForCreate, 
      EventName: eventName.value,
      EventType: eventType.value,
      NumAttendees: numAttendees.value,
      Description: description.value,
      AtriumOccupy: atriumOccupy.checked,
      AtriumBuilding: atriumBuilding,
      StartEnd: startEnd,
      EventAgreement: eventAgreement.checked,
      MediaEquip: mediaEquip.checked,
      RSOID: RSOID,
      RoomID: roomID,
    };

    var js = JSON.stringify(obj);
    console.log(js);
    try
    {  
       var response = await fetch(`https://knightsreserv-00cde8777914.herokuapp.com/api/createEvent`, {
       // var response = await fetch(`http://localhost:5000/api/createEvent`, {
        method: 'POST',
        body: js,
        headers: {
          'Content-Type':'application/json',
          'Authorization': `Bearer ${userToken}`,
        }
      });
    }
    catch (error)
    {
      console.error(error);
    }
    
    const data = await response.json();
    console.log(data);
  };

  function handleCreateReservation(e) {
    // PASS IN ROOM INFORMATION
    e.preventDefault();
    console.log(selectedDate);
    console.log("Index: " + selectedTime);
    console.log(availableTimes[selectedTime]);
    createEvent(availableTimes[selectedTime]);
    window.location.reload();
  }

  return (
    <Modal show={room !== null} onHide={handleCloseModal} dialogClassName="roomDetailsModal">

      <Modal.Header closeButton>
        <Modal.Title>Room Details</Modal.Title>
      </Modal.Header>

      <Modal.Body id="roomDetailsModalBody">
        {roomDetails && (!showEventForm ? (
          <>
            {/* Room Description Section */}
            <div className="roomDescription">
              <div className="roomDescriptionLeft">
                <img src={Lecture} alt="Room Image" className="search-page-modal-img" />
              </div>
              <div className="roomDescriptionRight">
                <div className="location-container">
                  <h5 className="location">LOCATION</h5>
                  <h1 className="building-name">{room.BuildingID} {room.RoomNumber}</h1>
                  <div className="row-space">
                    <div className="capacity-space">
                      <IconUsers size={30} color="blue" />
                      <h5>{room.Capacity}</h5>
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
                      <label className = "dumb-text" htmlFor="dateRangeStart">Date:</label>
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
                        onClick={() => setSelectedTime(index)}
                      >
                        {time}
                      </Button>
                    ))}
                  </div>
                </div>
            </div>
          </>
        ) : ( 
          <form onSubmit={handleCreateReservation}>
            <div className="CompleteReservationContainer">
              <div className="complete-reservation-input-label">
                  <label htmlFor="eventName">Event Name:</label>
                  <input className="dumb-formatting" type="text" id="eventName" placeholder="Enter Event Name" ref={(c) => (eventName = c)} required/>
              </div>
              <div className="complete-reservation-input-label">
                  <label htmlFor="eventType">Event Type:</label>
                  <input type="text" id="eventType" placeholder="Enter Event Type" ref={(c) => (eventType = c)} required/>
              </div>
              <div className="complete-reservation-input-label">
                  <label htmlFor="eventDescription">Event Description:</label>
                  <input type="text" id="eventDescription" placeholder="Enter Event Description" ref={(c) => (description = c)} required/>
              </div>
              <div className="complete-reservation-input-label">
                  <label htmlFor="eventAttendees">Number of Attendees:</label>
                  <input type="text" id="eventAttendees" placeholder="Enter Number of Attendees" ref={(c) => (numAttendees = c)} required/>
              </div>
              <div className="complete-reservation-checkbox">
                  <span htmlFor="eventAtriumLobby">Atrium or Lobby Needed:</span>
                  <input type="checkbox" id="eventAtriumLobby" ref={(c) => (atriumOccupy = c)}/>
              </div>
              <div className="complete-reservation-checkbox">
                  <span htmlFor="eventMediaEquip">Need use of Media Equipment:</span>
                  <input type="checkbox" id="eventMediaEquip" ref={(c) => (mediaEquip = c)}/>
              </div>
              <div className="complete-reservation-checkbox">
                  <span htmlFor="eventAgreement">Agree to Event Terms:</span>
                  <input type="checkbox" id="eventAgreement" ref={(c) => (eventAgreement = c)} required/>
              </div>
              <div id="CreateReservationButtonContainer">
              <Button
                id="CreateReservationBackButton"
                variant="primary"
                onClick={() => setShowEventForm(false)}
              >
                Back
              </Button>
              <Button
                id="CreateReservationSubmitButton"
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </div>
          </div>
        </form>
        ))}
      </Modal.Body>

      <Modal.Footer>
        {!showEventForm ? (
          <Button
            id="CreateReservationSubmitButton"
            variant="primary"
            type="submit"
            onClick={() => setShowEventForm(true)}
          >
            Create Reservation
          </Button> 
        ) : (
          <div></div>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default RoomDetails;
