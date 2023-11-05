import React, { useState } from 'react';
import Room from './Room';
import RoomDetails from './RoomDetails';
import { Row } from "react-bootstrap";
import '../../../styles/index.css';

function RoomList() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const openRoomDetails = (room) => {
    setSelectedRoom(room);
  };

  const closeRoomDetails = () => {
    setSelectedRoom(null);
  };

  const rooms = [
    { id: 1, name: 'CB1 101', description: 'Description of Room 1' },
    { id: 2, name: 'CB2 202', description: 'Description of Room 2' },
    { id: 3, name: 'MSB 245', description: 'Description of Room 3' },
    { id: 4, name: 'MSB 245', description: 'Description of Room 4' },
    { id: 5, name: 'MSB 245', description: 'Description of Room 5' },
    { id: 6, name: 'MSB 245', description: 'Description of Room 6' },
    { id: 7, name: 'MSB 245', description: 'Description of Room 7' },
    { id: 8, name: 'MSB 245', description: 'Description of Room 8' },
    { id: 9, name: 'MSB 245', description: 'Description of Room 9' },
    { id: 10, name: 'MSB 245', description: 'Description of Room 10' },
    { id: 11, name: 'MSB 245', description: 'Description of Room 11' },
    { id: 12, name: 'MSB 245', description: 'Description of Room 12' },
  ];

  return (
    <div className="room-list">
      {rooms.map(room => (
        <Row key={room.id} className="room-item">
          <Room name={room.name} description={room.description} onClick={() => openRoomDetails(room)} />
        </Row>
      ))}
      {selectedRoom && (
        <RoomDetails room={selectedRoom} handleCloseModal={closeRoomDetails} />
      )}
    </div>
  );
}

export default RoomList;

