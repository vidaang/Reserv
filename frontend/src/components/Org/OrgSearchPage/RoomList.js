import React, { useState } from 'react';
import Room from './Room';
import RoomDetails from './RoomDetails';
import { Row } from "react-bootstrap";
import '../../../styles/index.css';

function RoomList({rooms}) {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openRoomDetails = (room) => {
    setSelectedRoom(room);
  };

  const closeRoomDetails = () => {
    setSelectedRoom(null);
  };

  rooms = [...rooms];

  return (
    <div className="room-list">
      {rooms.map(room => (
        <Row key={room.RoomID} className="room-item">
          <Room name={room.RoomNumber} description={room.RoomInfo} onClick={() => openRoomDetails(room)} />
        </Row>
      ))}
      {selectedRoom && (
        <RoomDetails room={selectedRoom} handleCloseModal={closeRoomDetails} />
      )}
    </div>
  );
}

export default RoomList;

